# Next.js 사용해보기

- 어떤 페이지에 SSR을 적용할지 고민이 필요한 것 같다
- 렌더되는 시점과 데이터의 변경 등 요건에 맞게 나누어 사용 할 것

> CSR 필요한 요소를 다 불러와 클라이언트에서 렌더링하므로 처음이 느리고 페이지 이동은 빠르다  
> SSR 데이터 등 서버에서 다 만들어진 화면을 가져옴 (검색엔진이 데이터 확인 가능)  
> 페이지를 변경할 때마다 데이터를 다시 부르는 작업등 페이지 이동에는 느린편이다

## Next.js

- cra와 같은 동작 Disable Javascript 하면 동작하지 않음 (pre render 하지 않는다)
- 즉 페이지가 그려진 이후의 페이지 내부 동작은 cra와 같다.

- SEO 관련한 대응을 위해서는 이하의 데이터 패칭 방식을 사용하여야 한다.

> Next.js로 구성한 서버에 요청이 오면 \_app에 미리 패칭할 데이터가 있는지 확인  
> 필요한 작업이 끝나면 \_app에서 page 순으로 렌더링  
> \_document를 실행하여 최종적인 html을 출력

### getStaticPaths

- 동적 주소에 여러 정적 페이지를 만들 경우 사용한다
- 이어서 설명할 getStaticProps와 함께 사용한다

```js
export async function getStaticPaths() {
  const posts = await new SanityService().getPosts();

  const paths = posts?.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return {
    // 요소 하나하나가 스테틱한 페이지가 됨
    paths,
    fallback: false,
    // blocking 하면 요청대로 페이지 시도
    // false 없으면 404
  };
}
```

### getStaticProps

- 빌드시 정적 페이지를 서버에서 만들어 놓는다
- 빌드 후 변하는 데이터에는 대응하지 않는다
- 미리 만들기 때문에 빠른 응답 가능

```js
// 요소(객체)에서 slug를 꺼낸다
// slug 라는 이름으로 동적 라우팅 되어있으므로 이름을 맞추어 주어야 한다
export async function getStaticProps({ params }) {
  const { slug } = params;

  const posts = await new SanityService().getPosts();

  const post = posts.find((p) => p.slug === slug);

  return {
    props: {
      slug,
      post,
    },
    revalidate: 20, // 정적 페이지 다시 만들기 텀
  };
}
```

### getServerSideProps

- 요청이 있을 때 서버에서 데이터를 요청하고 새로운 데이터를 받아서 그려준다
- 빈번하게 update가 되는 경우에 유용하다

```js
export async function getServerSideProps() {
  const { results } = await (await fetch(`/api/movies`)).json();
  return {
    props: {
      results,
    },
  };
}
```
