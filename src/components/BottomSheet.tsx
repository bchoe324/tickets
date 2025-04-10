import CloseIcon from "@/assets/icons/CloseIcon";

const BottomSheet = ({
  onClose,
  children,
  title,
}: {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="relative z-15">
      <div
        className="w-screen h-screen fixed inset-0 bg-black/10 cursor-pointer"
        onClick={onClose}
      ></div>
      <div className="width-bounded h-auto p-layout fixed bottom-0 left-[50%] transform translate-x-[-50%] bg-white shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] rounded-t-[20px]">
        <div className="flex-between mb-layout">
          <h3 className="text-[18px] font-semibold">{title}</h3>
          <button onClick={onClose} className="w-[20px] hover:opacity-80">
            <CloseIcon fill="#999" />
          </button>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default BottomSheet;
