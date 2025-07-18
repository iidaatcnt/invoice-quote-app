export default function Home() {
  return (
    <div className="text-center py-8">
      <h1 className="text-4xl font-bold mb-4">請求書・見積書作成アプリ</h1>
      <p className="text-lg text-gray-700">
        このアプリケーションは、クライアント向けの請求書と見積書を簡単に作成できるように設計されています。
      </p>
      <p className="text-lg text-gray-700 mt-2">
        上部のナビゲーションから「見積書」または「請求書」を選択して、作成を開始してください。
      </p>
    </div>
  );
}
