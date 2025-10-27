import { NextResponse } from "next/server";

export async function GET() {
  // placeholder: client can call this. When ready, swap this
  // to call Google Places / Business Profile (server-side) with your API key.
  return NextResponse.json({
    rating: 5.0,
    count: 18,
    reviews: [
      { id: "m1", name: "Catherine R.", rating: 5, text: "Beautiful work and very clean job site. Communication was excellent." },
      { id: "m2", name: "James W.", rating: 5, text: "They handled our addition end-to-end. On time, on budget." },
      { id: "m3", name: "Mark P.", rating: 5, text: "Roof tear-off and re-roof in one day. Professional crew." },
      { id: "m4", name: "Alyssa D.", rating: 5, text: "Kitchen remodel turned out incredible—fit and tile work are top notch." },
      { id: "m5", name: "Kevin H.", rating: 5, text: "Crew kept the site tidy every night. Would hire DiFiore again in a heartbeat." },
      { id: "m6", name: "Lauren S.", rating: 5, text: "From design through punch list they were responsive, organized, and friendly." }
    ]
  });
}
