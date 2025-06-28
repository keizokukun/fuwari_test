<script>
export let slug;
let author = "";
let content = "";
let comments = [];

const loadComments = async () => {
	const res = await fetch(`/api/comments/?slug=${slug}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
	comments = await res.json();
};

const submitComment = async () => {
	console.log("送信データ:", slug, author, content); // デバッグ用
	const res = await fetch("/api/comments/", {
		method: "POST",
		body: JSON.stringify({ post_slug: slug, author: author, content: content }),
		headers: { "Content-Type": "application/json" },
	});
	author = content = "";
	await loadComments();
};

import { onMount } from "svelte";
onMount(loadComments);
</script>

  <div class="grid grid-cols-1 gap-8">
  <h3>コメント</h3>
  {#each comments?.body?.comments as comment, i}
    <div class="row-span-2 grid grid-rows-subgrid grid-rows-2 grid-cols-1 gap-2">
      <div>
        <strong>{`${i + 1}: ${comment.author || "no name"}`}</strong>
        <small>{new Date(comment.post_date).toLocaleString()}</small>
      </div>
      <p>{comment.content}</p>
    </div>
  {/each}
  </div>
<div class="grid grid-cols-1 gap-4 mt-8">
    <h3>コメントを書く</h3>
    <form on:submit|preventDefault={submitComment} class="row-span-4 grid grid-rows-subgrid grid-rows-2 grid-cols-1 gap-4 md:w-4/4">
      <input bind:value={author} placeholder="名前" class="bg-[var(--license-block-bg)] rounded-md">
      <textarea bind:value={content} placeholder="コメント内容" required class="h-24 bg-[var(--license-block-bg)] rounded-md field-sizing-content"></textarea>
      <button type="submit" class="btn-regular h-8 text-sm px-3 rounded-lg">投稿</button>
    </form>
</div>

