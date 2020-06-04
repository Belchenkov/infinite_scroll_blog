const postsContainer = document.getElementById('post-container');
const filter = document.getElementById('filter');
const loading = document.querySelector('.loader');

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );

    return  await res.json();
}

// Show posts in DOM
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
          <div class="number">${post.id}</div>
          <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
          </div>
        `;

        postsContainer.appendChild(postEl);
    });
}

// Show loader & fetch more posts
function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 1000);
    }, 2000);
}

// Display Posts
showPosts();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientWidth } = document.documentElement;

    if (scrollTop + clientWidth >= scrollHeight - 5) {
        showLoading();
    }
});
