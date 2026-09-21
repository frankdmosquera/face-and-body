import type { Review } from "@/types/reviewsTypes";

// Verbatim excerpts (whole sentences, nothing rewritten) from the public
// Google reviews on her listing, read on 2026-09-19. Authors as Google shows
// them, shortened to first name and initial, which is the convention this
// file has always used.
//
// WHAT THIS LIST IS FOR. The Places API returns a maximum of 5 reviews
// however many exist - verified against Google's own reference and against
// the live API, which reports userRatingCount 79 and a reviews array of 5.
// This list is how the other 74 reach the page. `components/home/Reviews.tsx`
// renders the live 5 first and then appends these, skipping anyone Google
// already sent, so nobody appears twice. If Google fails entirely, this list
// is the whole section rather than an empty band.
//
// WHY IT IS HAND-WRITTEN. There is no sanctioned way to read past the 5
// automatically. The Business Profile API can, but only after the owner
// grants OAuth and Google approves the application. Until that exists this
// file is the mechanism, and it goes stale on purpose rather than silently.
//
// WHAT IS NOT HERE, and why:
//   - the four negative reviews. Four and five star only, matching the
//     MIN_RATING filter on the live feed. They stay on her listing, which
//     this section links to, and the 4.7 from 79 above the cards is Google's
//     own unfiltered average. This is the testimonial wall, not the record.
//   - reviews Google truncates with "... More". Only the visible part can be
//     quoted, and half a sentence is not a testimonial.
//   - reviews with a rating but no words. Nothing to quote.
//   - two reviewers called "Sandra" and "Sandra Blanco". Same name as the
//     owner, so the card reads as though she wrote it herself.
//   - "heguer ack", which is Frank's own review. Not hidden, just a decision
//     that belongs to him rather than to this file.
//
// ADDING ONE: copy the quote verbatim, shorten the name, pick a treatment for
// the badge or leave it null. Nothing else to wire.
//
// REFRESHING THE WHOLE LIST, when enough new reviews have built up:
//   1. open the listing, Reviews tab, and scroll until all of them render -
//      it lazy-loads, and it only responds to real scrolling
//   2. expand every truncated one, or you get half sentences
//   3. read them off and replace the entries below
//   4. rebuild
// There is no script for this on purpose. Automating a daily scrape of Maps
// is against Google's terms and breaks the day they rename a CSS class; the
// sanctioned way to do it on a schedule is the Business Profile API, which
// needs the owner's OAuth and Google's approval. Until that exists this list
// is deliberately manual, and it goes stale visibly rather than silently.
//
// NOTHING IS FETCHED AT RUNTIME FOR THESE. They compile into the page, so
// "Show more reviews" makes no request at all - not to Google, not to our own
// cache. All 62 ship in the HTML, which is also what lets Google index them.
// That costs 110 KB of raw markup and about 33 KB gzipped for the whole page,
// so there is nothing here worth lazy-loading.
const GOOGLE_LISTING =
  "https://www.google.com/maps/place/?q=place_id:ChIJiRuswV91cVMRsuRTwgJ6hJ0";

/**
 * Rating defaults to 5 because every review in this list is a 5, read off
 * the listing on 2026-09-19 and checked one by one. Her only 4-star carries
 * no text so it is not quotable, and the five 1-stars are excluded by the
 * MIN_RATING rule. Pass the fourth argument if that ever stops being true.
 */
const g = (
  quote: string,
  author: string,
  treatment: string | readonly string[] | null,
  avatar?: string,
  reviewedAt?: string,
  rating = 5,
): Review => ({
  quote,
  source: "google",
  sourceUrl: GOOGLE_LISTING,
  author,
  rating,
  avatar,
  reviewedAt,
  treatment,
});

export const reviewsData: readonly Review[] = [
  g(
    "I've been seeing Sandra at Face & Body Wellness for about a year for my acne-prone skin, and the improvement has been amazing.",
    "O.O. B",
    "Deep Cleansing Facial",
  ),
  g(
    "Laser hair removal has been a success for me, she made me feel very comfortable from the first session. Sandra is always punctual and gives me recommendations after treatments.",
    "Daniela F.",
    "Laser Hair Removal",
  ),
  g(
    "Absolutely amazing facial experience! My skin has not felt this soft and smooth in years! I would highly recommend this to everyone.",
    "Irene R.",
    "Facial",
  ),
  g(
    "I had an amazing massage experience here! The therapist was attentive to my needs, and I left feeling completely relaxed and rejuvenated.",
    "Sadegh G.",
    "Relaxation Massage",
    "/reviews/sadegh-g.jpg",
    "2024-09-19",
  ),
  g(
    "I had carbon peel, melasma treatment and bio microneedling treatments and I have had really noticeable results. Sandra, the owner, always treats me with great kindness and care. She is truly a professional and pays attention to every detail.",
    "Karla G.",
    "Carbon Peel",
  ),
  g(
    "The laser removal she has done on me has work so well! She works fast and efficiently. I would definitely recommend her if you're planning on getting laser hair removal!",
    "Melany P.",
    "Laser Hair Removal",
  ),
  g(
    "My skin looks so clean and the products used are really good. I really recommend you get your facials done at Face and Body Wellness Centre!",
    "Nubia M.",
    "Deep Cleansing Facial",
  ),
  g(
    "Went for my first facial ever!! It was so relaxing and everything was well explained. She's so lovely too!! Can't wait to go back.",
    "Emmy R.",
    "Facial",
  ),
  g(
    "I was at Face and Body Wellness Centre recently for a facial and chemical peel and the whole experience was excellent! Sandra really understood my skin and the struggles I am facing. The ambiance was very relaxing and it was a very lovely time.",
    "Mariana R.",
    "Chemical Peel",
  ),
  g(
    "After a very bad experience with laser hair removal with another person, I was very afraid of trusting someone else, but Sandra has given me a lot of confidence, she listens to my concerns and is very professional with her work. And best of all, I saw results from the very first session!",
    "Valeria D.",
    "Laser Hair Removal",
  ),
  g(
    "Sandra is amazing!!! She is patient, kind, and super flexible. She takes the time to make sure everything is done right, that you know the whole process, and are always comfortable.",
    "Ivana P.",
    null,
  ),
  g(
    "In this place they always make me feel very safe and happy with all the treatments that I undergo, she is always taking care of me so that everything is fine.",
    "Brenda B.",
    "Laser Hair Removal",
    "/reviews/brenda-b.jpg",
    "2023-09-19",
  ),
  g(
    "Sandra is amazing!! Thorough, knowledgeable, and great at what she does! Very kind, helped me book an appointment later in the day when I made a mistake booking online. 10/10 would recommend.",
    "Victoria D.",
    null,
  ),
  g(
    "I started seeing a big difference from the very first session, the prices are super affordable and the service is spectacular. Would definitely recommend this spa if you are thinking of getting laser hair removal or any other spa service!",
    "Itzel R.",
    "Laser Hair Removal",
  ),
  g(
    "Sandra is very professional and caring. I recommend the hair removal; good results. I am looking forward to try other services.",
    "Lina T.",
    "Laser Hair Removal",
  ),
  g(
    "Great value for your money. Sandra is very professional even did extra mile on massage. Amazing experience and will surely come back for another facials.",
    "Catherine R.",
    "Relaxation Massage",
  ),
  g(
    "Sandra is very knowledgeable and makes each visit so relaxing and comfortable. Very clean and services are very reasonable. She provides many services. I highly recommend her, will be coming back for sure.",
    "Terry M.",
    null,
  ),
  g(
    "One of the best spas I've been to in YYC. The massage rooms were perfectly dimmed lighting, soothing music, and the environment is actually quiet & calming!",
    "Yeimy I.",
    "Relaxation Massage",
  ),
  g(
    "Lovely experience, Sandra is very professional and she also recommended me a specific treatment for what I need, I recommend this place if you want to treat yourself.",
    "Angy A.",
    null,
  ),
  g(
    "Face and Body Wellness Centre is my go-to for a relaxation massage and also a really nice place for enhancing your beauty with rejuvenating facials. Highly recommend for those seeking wellness and a radiant glow!",
    "Gladys V.",
    "Relaxation Massage",
  ),
  g(
    "I went there for a massage, also for a facial. Sandra is very professional she did a really good job, very recommended.",
    "Stephanie C.",
    null,
  ),
  g(
    "She is very very focus and high knowledge about skin care. My face scars improve a lot. Amazing job about skin care.",
    "Claudia L.",
    "Skin Consultation",
    "/reviews/claudia-l.jpg",
    "2021-09-19",
  ),
  g(
    "Excellent service, she is very kind and careful in her work, I loved the facial and my favorite treatment was the body exfoliation, I loved it.",
    "Abigail L.",
    ["Facial", "Body Exfoliation"],
    "/reviews/abigail-l.jpg",
    "2023-09-19",
  ),
  g(
    "I had a bio microneedling and a microdermabrasion 2 weeks apart and my skin looks so much brighter and full. The service is excellent!",
    "Marlen S.",
    ["Microneedling", "Microdermabrasion Facial"],
    "/reviews/marlen-s.jpg",
    "2024-09-19",
  ),
  g(
    "Do you want to feel pampered and amazing at last? This is the place! Super great service, clean and relaxing atmosphere. Prepare to not want to ever leave! I can't wait for my next appointment!",
    "Iris R.",
    null,
  ),
  g(
    "Very professional and very detail oriented. She's patient and extremely friendly, her work is incredibly and I would only recommend those I know to come see her.",
    "Zharitk C.",
    null,
  ),
  g(
    "Excellent service! One of the best massages I have ever had. Definetly coming back! Highly recommended!",
    "Sebastian P.",
    "Relaxation Massage",
  ),
  g(
    "Can't say enough about Sandra, professional, knowledgeable and just overall great. Recommend her 100%.",
    "Erika v.",
    null,
  ),
  g(
    "Very professional, clean and friendly environment. I would go back to this place over and over again! From the time I walked in to the time I left I never felt so important as I did here.",
    "Judy M.",
    null,
  ),
  g(
    "Magnificent job, we did a massage session with my husband and it was fabulous, 100% recommended.",
    "Leydi L.",
    "Relaxation Massage",
  ),
  g(
    "Qualified service with a 10 excellent attention and work I highly recommend them the massages became essential for me thanks for that great service.",
    "Yeison B.",
    "Relaxation Massage",
  ),
  g(
    "One of the best massage I ever had, Sandra is very professional.",
    "Melvin M.",
    "Relaxation Massage",
  ),
  g(
    "Best place in calgary for massage, the service is excellent and the quality of the products is like no other.",
    "Rogelio R.",
    "Relaxation Massage",
  ),
  g(
    "The massage and faciales are really good services. I really recommend this place.",
    "Moises C.",
    null,
  ),
  g(
    "Very professional. The recommended treatments have been correct. I have noticed the improvements. I'm very happy with the result.",
    "Vivi Q.",
    null,
  ),
  g(
    "Excellent service, it is a good place to enjoy a relaxing massage and other things, super recommended.",
    "Maria V.",
    "Relaxation Massage",
  ),
  g(
    "Excellent service, good products, very hygienic place, I highly recommend it.",
    "Maira G.",
    null,
  ),
  g(
    "Very professional and knowledgeable about the skin and products. I love my skin after treatments.",
    "Gladys M.",
    "Facial",
  ),
  g(
    "Very professional and makes you feel comfortable. I really recommend her.",
    "Rosy M.",
    "Laser Hair Removal",
  ),
  g("Very relaxing experience with Sandra! Highly recommend!", "Hala T.", null),
  g(
    "I highly recommend Sandra, she is very professional, it was a beautiful experience.",
    "Michelle J.",
    null,
  ),
  g(
    "The best services & care ever!! Thank you Xiommy for your care and patience.",
    "Alexandra C.",
    null,
  ),
  g(
    "Excellent service, very good equipment, incredible attention.",
    "Lucy L.",
    null,
  ),
  g(
    "Excellent service, very professional, highly recommended.",
    "José R.",
    null,
  ),
  g("I love it. Excellent service.", "Jenny A.", null),
  g(
    "Excellent costumer service, products and body treatments.",
    "Karol B.",
    null,
  ),
  g(
    "Nice place to relaxing, clean place. And professional people.",
    "Fabian R.",
    null,
  ),
  g("Excellent service and highly recommended.", "Julian B.", null),
  g("Excellent service, I was delighted.", "Ana S.", null),
  g(
    "Excellent service, professional and friendly. I love the results; from the first session I saw magnificent results. Definitely my favorite spa!!",
    "Laudy P.",
    null,
  ),
  g(
    "Excellent professional service, Sandra has extensive knowledge and experience. I arrived with back and shoulder pain and left feeling relieved.",
    "Miguel C.",
    "Relaxation Massage",
  ),
  g(
    "From the environment to the equipments, also the quality and variety of the products she uses and her professionalism are top notch. Sandra always takes her time to explain what products and treatments are best for my skin tone.",
    "Uchenna O.",
    "Skin Consultation",
  ),
  g(
    "I've been doing treatments with her for over two years and never had an issue in my skin. She takes the time to explain the process and expectations.",
    "Johanna M.",
    ["Laser Hair Removal", "Facial"],
    "/reviews/johanna-m.jpg",
    "2023-09-19",
  ),
  g(
    "I used to get treatments at another clinic and recently switched to Sandra. One thing that's worth mentioning is that she listens to your expectations and does her job accordingly. She considers what's best for you and recommends treatments based on your needs.",
    "Moji H.",
    null,
  ),
  g(
    "She has given me very gentle massages that are right for the condition that I have which is lupus, it has never irritated my skin or caused a flare up.",
    "Scarlett P.",
    "Relaxation Massage",
    "/reviews/scarlett-p.png",
    "2021-09-19",
  ),
  g(
    "I had the opportunity to go on Saturday to get a relaxing massage with my husband, we left feeling refreshed after Sandra and Maira pampered us for an hour. I suffer from migraines and at the end of my massage Sandra offered me a therapeutic massage to relieve the tension in my neck, scalp and facial muscles, it was the best part!",
    "Eliana S.",
    "Relaxation Massage",
  ),
  g(
    "When I arrived here first, I was looking for a solution for my right shoulder pain. The therapist explained in depth what seemed to be the issue and what needed to be done to heal my injury. From the first session, I could feel the difference in my affected area. After I have been in pain for almost 10 months, I can assure you that coming here is a blessing.",
    "Herbert C.",
    "Relaxation Massage",
  ),
  g(
    "I had my first facial in a long time and I had a very good experience! My face feel soft and clean. A week later I had a massage and I felt rejuvenated after the session.",
    "C.D.",
    "Facial",
  ),
  g(
    "I had a charcoal peel and I simply LOVE IT!! I left with miraculously clear skin, my blackheads had pretty much vanished, and my face was definitely tighter and glowing.",
    "Pabla G.",
    ["Carbon Peel", "Facial"],
    "/reviews/pabla-g.jpg",
    "2023-09-19",
  ),
  g("I love it, very comfortable and amazing peoples.", "Isabella B.", null),
  g(
    "Sandra is great at her job and I feel some much better after having my massages with her, my son had have facial there as well. I really recommend her and always feel welcomed.",
    "Luz L.",
    "Relaxation Massage",
  ),
  g(
    "She is highly skilled, experienced, and very professional. She took the time to understand where I was feeling pain and tailored the treatment to my needs. After the session, my pain was completely gone, and I felt so much better.",
    "Joanetlin C.",
    "Relaxation Massage",
  ),
];
