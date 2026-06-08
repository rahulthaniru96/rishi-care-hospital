-- ══════════════════════════════════════════
-- RISHI CARE HOSPITAL — DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ══════════════════════════════════════════

-- PATIENTS
CREATE TABLE patients (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  phone        TEXT NOT NULL,
  age          INTEGER NOT NULL CHECK (age > 0 AND age < 150),
  gender       TEXT NOT NULL CHECK (gender IN ('Male','Female','Other')),
  doctor_name  TEXT NOT NULL,
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PATIENT HISTORY
CREATE TABLE patient_history (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id   UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  record_type  TEXT NOT NULL CHECK (record_type IN (
                 'Consultation','Blood Test','Urine Test',
                 'X-Ray','ECG','Ultrasound','Other')),
  doctor_name  TEXT,
  summary      TEXT NOT NULL CHECK (char_length(summary) <= 250),
  remarks      TEXT CHECK (char_length(remarks) <= 150),
  record_date  DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MEDICINES
CREATE TABLE medicines (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_name   TEXT NOT NULL,
  price           NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  quantity        INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  gst_percent     NUMERIC(5,2) NOT NULL DEFAULT 0,
  expiry_date     DATE,
  minimum_stock   INTEGER NOT NULL DEFAULT 10,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- BILL NUMBER SEQUENCE
CREATE SEQUENCE IF NOT EXISTS bill_seq START 1;

-- BILLS
CREATE TABLE bills (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id   UUID NOT NULL REFERENCES patients(id),
  bill_number  TEXT NOT NULL UNIQUE,
  subtotal     NUMERIC(10,2) NOT NULL,
  gst_amount   NUMERIC(10,2) NOT NULL,
  grand_total  NUMERIC(10,2) NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- BILL ITEMS
CREATE TABLE bill_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id         UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
  medicine_id     UUID NOT NULL REFERENCES medicines(id),
  medicine_name   TEXT NOT NULL,
  quantity        INTEGER NOT NULL CHECK (quantity > 0),
  unit_price      NUMERIC(10,2) NOT NULL,
  gst_percent     NUMERIC(5,2) NOT NULL,
  line_total      NUMERIC(10,2) NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════
-- ATOMIC BILL CREATION FUNCTION
-- ══════════════════════════════════════════
CREATE OR REPLACE FUNCTION create_bill(
  p_patient_id UUID,
  p_items      JSONB
) RETURNS UUID AS $$
DECLARE
  v_bill_id    UUID;
  v_subtotal   NUMERIC := 0;
  v_gst_total  NUMERIC := 0;
  v_item       JSONB;
  v_line_base  NUMERIC;
  v_line_gst   NUMERIC;
  v_bill_num   TEXT;
BEGIN
  -- Generate bill number: RCH-YYYYMMDD-XXXX
  v_bill_num := 'RCH-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' ||
                LPAD(nextval('bill_seq')::TEXT, 4, '0');

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    v_line_base := (v_item->>'quantity')::INTEGER *
                   (v_item->>'unit_price')::NUMERIC;
    v_line_gst  := v_line_base *
                   (v_item->>'gst_percent')::NUMERIC / 100;

    -- Deduct stock atomically — fails if insufficient
    UPDATE medicines
       SET quantity = quantity - (v_item->>'quantity')::INTEGER
     WHERE id = (v_item->>'medicine_id')::UUID
       AND is_active = TRUE
       AND quantity >= (v_item->>'quantity')::INTEGER;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Insufficient stock or inactive medicine: %',
        v_item->>'medicine_name';
    END IF;

    v_subtotal  := v_subtotal  + v_line_base;
    v_gst_total := v_gst_total + v_line_gst;
  END LOOP;

  -- Insert bill
  INSERT INTO bills (patient_id, bill_number, subtotal, gst_amount, grand_total)
  VALUES (
    p_patient_id,
    v_bill_num,
    v_subtotal,
    v_gst_total,
    v_subtotal + v_gst_total
  )
  RETURNING id INTO v_bill_id;

  -- Insert bill items
  INSERT INTO bill_items
    (bill_id, medicine_id, medicine_name, quantity, unit_price, gst_percent, line_total)
  SELECT
    v_bill_id,
    (v_item->>'medicine_id')::UUID,
    v_item->>'medicine_name',
    (v_item->>'quantity')::INTEGER,
    (v_item->>'unit_price')::NUMERIC,
    (v_item->>'gst_percent')::NUMERIC,
    (v_item->>'quantity')::INTEGER *
      (v_item->>'unit_price')::NUMERIC *
      (1 + (v_item->>'gst_percent')::NUMERIC / 100)
  FROM jsonb_array_elements(p_items) AS v_item;

  RETURN v_bill_id;
END;
$$ LANGUAGE plpgsql;

-- ══════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ══════════════════════════════════════════
ALTER TABLE patients        ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicines       ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills           ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_items      ENABLE ROW LEVEL SECURITY;

-- Only authenticated users (admin) can access all tables
CREATE POLICY "Admin full access" ON patients
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access" ON patient_history
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access" ON medicines
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access" ON bills
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access" ON bill_items
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);