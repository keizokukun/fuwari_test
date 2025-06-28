export const prerender = false;
import { drizzle } from "drizzle-orm/d1";
import { like } from "drizzle-orm"
import { comments } from "../../db/schema";
import type { Runtime } from "@astrojs/cloudflare";
import type { D1Database } from "@cloudflare/workers-types";

export async function GET(context: { request: Request; locals: Runtime }) {
	const { request, locals } = context;
	const envDB = locals.runtime.env.DB as D1Database;
	const db = drizzle(envDB);
	const url = new URL(request.url);
	const slug = url.searchParams.get("slug");

let comment = await db.select().from(comments).where(like(comments.post_slug, `${slug}`));

	// if (!comment || (Array.isArray(comment) && comment.length === 0)) {
	// 	comment = [
	// 		{
	// 			id: 1,
	// 			author: "DUMMY1",
	// 			content: "content1",
	// 			post_slug: null,
	// 			post_date: null,
	// 		},
	// 		{
	// 			id: 2,
	// 			author: "DUMMY2",
	// 			content: "content2",
	// 			post_slug: null,
	// 			post_date: null,
	// 		},
	// 	];
	// }

	return new Response(
		JSON.stringify({
			body: {
				comments: comment,
				request: request,
			},
		}),
		{ status: 200 },
	);
}

export async function POST(context: { request: Request; locals: Runtime }) {
	const { request, locals } = context;

	if (!locals.runtime.env.DB) {
		throw new Error("Database connection is missing");
	}
	const envDB = locals.runtime.env.DB as D1Database;
	const db = drizzle(envDB);

	const body = await request.json(); // 修正
	const comment = {
		author: body.author, // 修正
		content: body.content, // 修正
		post_slug: body.post_slug, // 修正
		post_date: new Date().toISOString(), // 修正
	};

	await db.insert(comments).values(comment);

	return new Response(
		JSON.stringify({
			body: { request: request },
		}),
		{ status: 200 },
	);
}
