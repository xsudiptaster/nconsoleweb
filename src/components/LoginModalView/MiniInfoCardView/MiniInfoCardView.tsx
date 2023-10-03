import React from "react";
import style from "./MiniInfoCardView.module.css";

interface IMiniInfoCardViewProps {
   children?: React.ReactNode;
}

const MiniInfoCardView: React.FC<IMiniInfoCardViewProps> = (props) => {
   return (
      <>
         <article className={style.card}>
            <div className={style.temporary_text}>Diagram</div>
            <div className={style.card_content}>
               <span className={style.card_title}>Used to create ERD</span>
               <span className={style.card_subtitle}>Thsi is a subtitle of this page. Let us see how it looks on the Web.</span>
               <p className={style.card_description}>
                  Lorem ipsum dolor, sit amet expedita exercitationem recusandae aut dolor tempora aperiam itaque possimus at,
                  cupiditate earum, quae repudiandae aspernatur? Labore minus soluta consequatur placeat.
               </p>
            </div>
         </article>
      </>
   );
};

export default MiniInfoCardView;
