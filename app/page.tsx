import Posts from "./posts/page";


export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 메인 페이지를 수정할 수 있음에 Posts 컴포넌트를 사용하여 유지보수 대비*/}
      <Posts />
    </div>
  );
}
