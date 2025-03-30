// import PopUp from "./../popUp/PopUp";


// export default function Nav(){

//     return(
//         <div>
//         <button onClick={()=>setopenPopup(true)} className="rounded-[8px] bg-[#EBF2FE] cursor-pointer text-[#3B82F6] p-3">ورود / ثبت نام</button>

//         </div>
//     )
// }



// import { useState } from "react";
// import PopUp from "./../popUp/PopUp"; // فرض می‌کنیم PopUp رو ایمپورت کرده باشیم

// export default function Nav() {
//     const [openPopup, setOpenPopup] = useState(false); // اینجا state رو می‌سازیم

//     return (
//         <div>
//             <button 
//                 onClick={() => setOpenPopup(true)} 
//                 className="rounded-[8px] bg-[#EBF2FE] cursor-pointer text-[#3B82F6] p-3">
//                 ورود / ثبت نام
//             </button>

//             {/* وقتی openPopup درست شد، PopUp رو نشون می‌دهیم */}
//             {openPopup && <PopUp setOpenPopup={setOpenPopup} />}
//         </div>
//     );
// }






import React, { useState } from 'react';
import PopUp from '../popUp/PopUp';

function Nav() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex justify-center mt-10 text-amber-50">
      <button className="bg-fuchsia-900 p-5" onClick={() => setShowModal(true)}>
        ورود
      </button>

      {/* پاپ‌آپ را نمایش می‌دهیم وقتی showModal برابر با true است */}
      {showModal && <PopUp setShowModal={setShowModal} />}
    </div>
  );
}

export default Nav;
