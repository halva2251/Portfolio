export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
}

export const posts: Post[] = [
  {
    slug: "building-songswap",
    title: "Building SongSwap: Go from Zero to Production in a Month",
    date: "2026-04-10",
    excerpt:
      "I had never written a line of Go. A month later I had a full-stack app with JWT auth, PostgreSQL, Docker, CI/CD, and a Raspberry Pi deployment. Here's what actually happened.",
    body: `I decided to learn Go the only way that works for me: by building something real.

The idea was simple. You submit a song, you get one back from a stranger. Themed chains, mood context — a music exchange platform. I called it SongSwap.

## The stack

Go for the backend, React + TypeScript for the frontend, PostgreSQL for the database, Docker for containerization, and GitHub Actions for CI/CD. Deployed to a Raspberry Pi sitting in my room.

At the time I had written maybe 50 lines of Go total. Most of what I knew came from skimming tour.golang.org.

## What I actually built

In roughly a month:

- JWT authentication (register, login, token refresh)
- PostgreSQL schema with migrations
- Rate limiting middleware
- 26 passing tests
- Docker containers for both dev and prod
- Dev containers for consistent local setup
- CI/CD pipeline that runs tests on every push
- Deployment to my Raspberry Pi via GitHub Actions

## What surprised me

Go's error handling felt annoying at first. \`if err != nil\` everywhere. But after a few weeks it clicked — you're forced to think about what can go wrong at every step. That changes how you design things.

The standard library is also genuinely good. I needed an HTTP router, middleware, JSON parsing, database access — Go's stdlib handles most of it. I added minimal dependencies.

## What I'd do differently

Structure the project better from the start. I moved things around a lot as the codebase grew. Knowing the final shape upfront would have saved time.

That said — building under uncertainty is probably unavoidable when you're learning. You can't know the right structure until you've made the wrong one.

---

SongSwap is on GitHub if you want to look at the code. It's not polished. But it works, it's tested, and it runs in production. That was the bar.`,
  },
  {
    slug: "badenhackt-2026",
    title: "Top 10 at BadenHackt 2026: What a Hackathon Actually Feels Like",
    date: "2026-03-22",
    excerpt:
      "I built the entire Go backend solo for Team Autexis in 24 hours. We placed top 10 out of 30 teams. The jury called the backend a textbook example for code quality.",
    body: `BadenHackt 2026. 30 teams, 24 hours, one theme.

Our team was building TrackMyFood — a food supply-chain traceability platform with trust scores and recall alerts. I was responsible for the entire backend.

## The setup

React Native frontend (my teammates), Go REST API (me). I started with the database schema around 9pm and didn't stop until morning.

The thing about hackathons is that you don't have time to overthink anything. You just make a decision and move. Wrong decision? Refactor and keep going. That pace is uncomfortable at first, then addictive.

## What I built in 24 hours

- Full REST API in Go
- JWT authentication
- Trust score calculation logic
- Recall alert endpoints
- PostgreSQL schema
- Working integration with the frontend team's app

## The jury feedback

When we presented, the jury called the backend "a textbook example for code quality." I didn't expect that. I was expecting to survive, not to be highlighted.

## What hackathons are actually good for

You learn how to make decisions fast. How to communicate under pressure. How to scope aggressively — cut features, not quality.

I also learned that clear API contracts between frontend and backend matter more in a hackathon than anywhere else. We agreed on JSON shapes early and never had integration issues.

Top 10 out of 30. I'll take it.`,
  },
  {
    slug: "why-i-build",
    title: "Why I Learn by Building, Not Watching",
    date: "2026-02-14",
    excerpt:
      "Tutorials never stuck for me. The moment I had something real to build, everything changed. I'm not sure this is a method — it might just be how I'm wired.",
    body: `I've tried the tutorial route. Watched the videos, read the docs, followed the guides. It never really stuck.

The information goes in and then evaporates. I could repeat back what I just read, but I couldn't use it. Something about the way I'm wired requires friction to actually learn.

## The moment something changes

The shift happens when I have a real problem. Not a tutorial problem — one I actually care about solving.

When I built SongSwap, I needed JWT auth. So I read everything about JWT auth — not to pass a quiz, but because the feature didn't work without it. That's a different kind of reading.

Same with Docker. I didn't learn Docker from a Docker course. I learned it because I wanted to deploy SongSwap, and deployment required containers.

## The downside

You skip a lot of foundational stuff. There are gaps.

I'll be mid-project and realize I don't know something I probably should have known from the start. Then I go learn that specific thing.

It's not the most efficient path. But the things I learn this way actually stay.

## What I'd tell someone starting out

Pick something small you'd actually use. Build it. When you hit a wall, learn exactly what you need to get past it. Repeat.

You'll end up with something working, gaps in your knowledge, and a much clearer picture of what to learn next. That's a better position than finishing a 40-hour course and having nothing to show for it.

---

This is just how it works for me. I'm not saying it's the only way.`,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
