
import { useUtilsStore } from "../zustand/useUtilsStore";
export function TooltipInfo() {

   const tooltipInfoText = useUtilsStore((state) => state.tooltipInfoText);

   if(!tooltipInfoText) return <></>;
   const iconTd = tooltipInfoText.e.target.closest('td');
   return ( 
      <>
         <div
            className="absolute w-[140px] z-30 transition-all duration-300"
            style={{ 
               top: `${iconTd.offsetTop - 25}px`, 
               left: `${iconTd.offsetLeft + 10}px`, 
               opacity: tooltipInfoText ? ".7" : 0 
            }}
         >
            <svg className=" w-[145px] h-[32px]">
               {/* <path d="M5 5 H 145 V 45 H 5 Z" /> 
               //M5 5 = moveTo (x5, y5) posiciona a caneta.
               //H145 = horizontal (x145).
               //V45 = vertical (y45).
               //L15 = diagonal (x12, y52)
               //A5,5 0 0,1 135,45 (A,5,5 nivel da curva, 0 sempre, 0,1 convexa, x135, y45)
                    
                  */}
               <path d="
                     M5,0 
                     H135
                     A5,5 0 0,1 140,5
                     V20
                     A5,5 0 0,1 135,25
                     H25 
                     L15,32 L15,25 
                     H5
                     A5,5 0 0,1 0,20 
                     V5
                     A5,5 0 0,1 5,0 
                     Z"
                  fill="rgba(0, 0, 0, 0.86)"
               />
               {/* H5 Z */}
            </svg>
            <p className="absolute top-[15%] left-[5px] w-[135px] text-center text-white text-xs">{tooltipInfoText.categ}</p>
         </div>
      </>
   )
}