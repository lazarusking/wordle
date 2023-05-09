import { useAlertContext } from "../contexts/AlertContext";

export default function Alert() {
  const { state: alert } = useAlertContext();
  // const { displayNotification,clearNotification } = useAlertContext();
  // const gamedata = props.game;
  // const {state:{alert}={}} = useKeyboardContext()
  const alertMsgs = [];
  // console.log(alert);
  // useEffect(() => {
  //   if(gamedata.game.wordList.includes(solution)){
  //     displayNotification("Game Won!","success")
  //   }

  //   return () => {
  //     console.log("Clearings notif");
  //     clearNotification()
  //   }
  // }, [])
  alert.newAlert.map((info, index) => {
    let status = "";
    switch (info.status) {
      case "success":
        status = `border-green-500 bg-blue-500`;
        break;

      default:
        status = `border-red-500 bg-rose-500`;
        break;
    }
    alertMsgs.push(
      <strong
        key={index}
        className={`${status} p-4 mx-auto rounded font-medium text-white`}
      >
        {info.message}
      </strong>
    );
  });
  if (alert.alert) {
    return (
      <div
        role="alert"
        className="z-40 text-base absolute justify-start space-y-2 top-8 flex flex-col w-full h-full"
      >
        {alertMsgs}
      </div>
    );
  }
  // return alert.newAlert.map((info) => {
  //   <div
  //     key={info.status}
  //     role="alert"
  //     className="z-10 text-base absolute -top-1 flex w-full justify-center"
  //   >
  //     <strong className="p-4 rounded border-red-500 bg-rose-500 font-medium text-white -700">
  //       {info.message}
  //     </strong>
  //   </div>;
  // });

  // if (alert.status === "success") {
  //   return (
  //     <div
  //       role="alert"
  //       className="z-10 text-base absolute -top-1 flex w-full justify-center"
  //     >
  //       <strong className="p-4 rounded border-green-500 bg-green-400 font-medium text-white -700">
  //         {alert.message}
  //       </strong>
  //     </div>
  //   );
  // }
}
