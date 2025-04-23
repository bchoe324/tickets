export default function Loading() {
  return (
    <div className="fixed inset-0 w-full h-screen z-20 flex-center">
      <div className="w-[32px] h-[32px] border-5 border-zinc-400 border-t-transparent rounded-[50%] animate-spin"></div>
    </div>
  );
}
