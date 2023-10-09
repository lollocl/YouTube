<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  export let threshold = 0;
  export let hasMore = true;

  const dispatch = createEventDispatcher();
  let isLoadMore = false;

  onMount(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const offset = documentHeight - (scrollY + windowHeight);

      if (offset <= threshold) {
        if (!isLoadMore && hasMore) {
          dispatch("loadMore");
        }
        isLoadMore = true;
      } else {
        isLoadMore = false;
      }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);

  });
</script>