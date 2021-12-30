import sanityClient from "@sanity/client";

export default function PostAll({ slug }) {
  return (
    <div>
      <h1>Post : {slug}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  // sanity로 부터 데이터를 가지고 온다
  const client = sanityClient({
    dataset: "production",
    projectId: "gvddgzfs",
    useCdn: process.env.NODE_ENV === "production",
  });
  const posts = await client.fetch(
    `*[_type == 'post']{
        title, 
        subtitle, 
        createdAt, 
        'content': content[]{
          ...,
          ...select(_type == 'imageGallery' => {'images': images[]{..., 'url': asset -> url}})
        },
        'slug': slug.current,
        'thumbnail': {
          'alt': thumbnail.alt,
          'imageUrl': thumbnail.asset -> url
        },
        'author': author -> {
          name,
          role,
          'image': image.asset -> url
        },
        'tag': tag -> {
          title,
          'slug': slug.current
        }
      }`
  );

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return {
    // 요소 하나하나가 스테틱한 페이지가 됨
    paths,
    fallback: false,
  };
}

// 요소(객체)에서 slug를 꺼낸다
//! slug 라는 이름으로 동적 라우팅 되어있으므로 이름을 맞추어 주어야 한다
export function getStaticProps({ params }) {
  const { slug } = params;
  return {
    props: slug,
  };
}
