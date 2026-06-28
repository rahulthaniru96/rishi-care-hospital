import { hospitalInfo } from '../../data/hospitalInfo'

const Reviews = () => {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Header */}
      <section className="relative py-20 md:py-28 overflow-hidden text-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1600&h=600&fit=crop" alt="Happy patients" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C4A6E]/90 to-[#0C4A6E]/70" />
        </div>
        <div className="container relative z-10 max-w-5xl mx-auto px-4 text-white">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold tracking-wide text-white/90 mb-4">
            PATIENT STORIES
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by Our Community
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Real experiences from patients and families we've had the privilege to care for.
          </p>
        </div>
      </section>

      {/* Rating Showcase */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container max-w-2xl mx-auto px-4 text-center">
          <div className="mb-6">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-4xl font-bold text-slate-900 mb-2">4.9 / 5.0</p>
            <p className="text-lg text-slate-600">Exceptional Patient Care</p>
          </div>

          <p className="text-slate-600 text-center mb-8">
            Patients consistently praise our doctors' expertise, caring staff, and modern facilities. Read what they have to say on Google Reviews.
          </p>

          <a
            href={`https://search.google.com/local/reviews?placeid=${hospitalInfo.googlePlaceId}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-xl hover:border-[#0C4A6E]/30 hover:shadow-lg transition-all group"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="text-left">
              <p className="font-bold text-slate-900 group-hover:text-[#0C4A6E] transition-colors">View on Google</p>
              <p className="text-xs text-slate-600">Read verified patient reviews</p>
            </div>
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What Patients Say</h2>
            <p className="text-slate-600">
              These testimonials reflect our commitment to excellent healthcare and compassionate patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                rating: 5,
                text: "Excellent care from the moment I walked in. The doctors are very knowledgeable and the staff is incredibly helpful. Highly recommend!",
                author: "Rajesh Kumar",
                type: "Patient",
              },
              {
                rating: 5,
                text: "My daughter was treated with so much care and attention. The diagnosis was quick and accurate. We're very grateful to the entire team.",
                author: "Priya Sharma",
                type: "Parent",
              },
              {
                rating: 5,
                text: "Best orthopedic care I've received. Dr. Kumar is a fantastic surgeon and the recovery has been smooth. Thank you!",
                author: "Manish Bhat",
                type: "Post-operative",
              },
            ].map((review, i) => (
              <div key={i} className="border border-slate-200 rounded-xl bg-white p-5">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic leading-relaxed text-sm">"{review.text}"</p>
                <div className="border-t border-slate-100 pt-3">
                  <p className="font-semibold text-slate-900 text-sm">{review.author}</p>
                  <p className="text-xs text-slate-500">{review.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Write a Review */}
      <section className="py-16 md:py-20 bg-sky-50 border-y border-sky-100">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Share Your Experience</h2>
            <p className="text-slate-600 mb-8">
              Had a great experience with us? Your review helps other patients find trustworthy healthcare. Please share your feedback on Google.
            </p>
            <a
              href={hospitalInfo.googleReviewLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0C4A6E] text-white font-semibold rounded-lg hover:bg-[#1E6B94] transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write a Review
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reviews
