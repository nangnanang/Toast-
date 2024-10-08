import "../toast.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import bus from "../EventBus";

const Toast = () => {
  // 실행시킬 메세지들을 저장하는 상태값
  const [toasts, setToasts] = useState([]);

  // 구독하면서 이 함수를
  //"SHOW_TOAST" 토픽의                   topic
  // handleToastEvent 리스너로 저장함     listener
  const handleToastEvent = (toast) => {
    // 메세지 저장
    setToasts((prevToasts) => [...prevToasts, { id: Date.now(), ...toast }]);

    // 시간이 지나면 가장 처음 실행된 메세지부터 삭제
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1));
    }, 5000);
  };

  const handleWarningToastEvent = (toast) => {
    // 메세지 저장
    setToasts((prevToasts) => [
      ...prevToasts,
      { id: Date.now() + " warning", ...toast },
    ]);

    // 시간이 지나면 가장 처음 실행된 메세지부터 삭제
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1));
    }, 5000);
  };

  const handleErrorToastEvent = (toast) => {
    // 메세지 저장
    setToasts((prevToasts) => [
      ...prevToasts,
      { id: Date.now() + " error", ...toast },
    ]);

    // 시간이 지나면 가장 처음 실행된 메세지부터 삭제
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1));
    }, 5000);
  };

  const handleSuccessToastEvent = (toast) => {
    // 메세지 저장
    setToasts((prevToasts) => [
      ...prevToasts,
      { id: Date.now() + " success", ...toast },
    ]);

    // 시간이 지나면 가장 처음 실행된 메세지부터 삭제
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1));
    }, 5000);
  };
  useEffect(() => {
    // subscribe 실행
    // unsubscribe은 subscribe이 결과값으로 반환하는 구독해제 함수
    const unsubscribe = bus.subscribe("SHOW_TOAST", handleToastEvent);
    const unsubscribe2 = bus.subscribe(
      "WARNING_TOAST",
      handleWarningToastEvent
    );
    const unsubscribe3 = bus.subscribe("ERROR_TOAST", handleErrorToastEvent);
    const unsubscribe4 = bus.subscribe(
      "SUCCESS_TOAST",
      handleSuccessToastEvent
    );

    // subscribe가 실행 후 반환하는 구독해제 함수
    // 를 실행하여 구독해제
    return () => {
      unsubscribe2();
      unsubscribe();
      unsubscribe3();
      unsubscribe4();
    };
  }, []);

  // 토스트창을 누르면 지우는 함수
  const toastDeleteHandler = (id) => {
    setToasts((prevToasts) =>
      prevToasts.filter((tos) => {
        return tos.id !== id;
      })
    );
  };

  const warningClass = (id) => {
    if (String(id).split(" ").includes("success")) {
      return "success-toast";
    } else if (String(id).split(" ").includes("warning")) {
      return "warning-toast";
    } else if (String(id).split(" ").includes("error")) {
      return "error-toast";
    } else {
      return "toast";
    }
  };

  // 포탈을 열어서 이 함수가 실행되면
  // 2번째 인자의 위치에(이 경우 body)
  // 1번째 인자를 집어넣음
  return createPortal(
    <div className="toast-container">
      {toasts.map((toast, index) => {
        return (
          <button
            key={index}
            className={warningClass(toast.id)}
            onClick={() => {
              toastDeleteHandler(toast.id);
            }}
          >
            {toast.message}
          </button>
        );
      })}
    </div>,
    document.body
  );
};

export default Toast;
