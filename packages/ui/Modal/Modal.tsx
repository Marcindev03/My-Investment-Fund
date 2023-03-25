import { FC, ReactNode, useEffect, useRef } from "react";

export type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  title = "",
  onClose,
  children,
}) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-md">
              <div
                ref={modalContainerRef}
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              >
                {!!title.length && (
                  <header className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">{title}</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={onClose}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </header>
                )}
                <section className="relative p-6 flex-auto">
                  <div className=" text-blueGray-500 text-lg leading-relaxed">
                    {children}
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
