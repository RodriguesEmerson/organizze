
import { useUtilsStore } from "../zustand/useUtilsStore";
export function TooltipInfo() {

   const tooltipInfoText = useUtilsStore((state) => state.tooltipInfoText);

   return (
      <>
         <svg className=" w-[145px] h-[52px]">
            {/* <path d="M5 5 H 145 V 45 H 5 Z" /> 
               //M5 5 = moveTo (x5, y5) posiciona a caneta.
               //H145 = horizontal (x145).
               //V45 = vertical (y45).
               //L15 = diagonal (x12, y52)
               //A5,5 0 0,1 135,45 (A,5,5 nivel da curva, 0 sempre, 0,1 convexa, x135, y45)
                    
                  */}
            <path d="
                     M10,5 
                     H135
                     A5,5 0 0,1 140,10
                     V40
                     A5,5 0 0,1 135,45
                     H25 
                     L15,52 L15,45 
                     H10
                     A5,5 0 0,1 5,40
                     V10
                     A5,5 0 0,1 10,5
                     Z"
               fill="rgba(0, 0, 0, 0.86)"
            />
            {/* H5 Z */}
         </svg>
         <p className="absolute top-[32%] left-[5px] w-[135px] text-center text-white text-xs">{tooltipInfoText}</p>
      </>
   )
}