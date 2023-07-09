import { FC } from "react";
import { FAQ } from "../../../types/faq/types";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import PlusIcon from "../iconsComponents/icons/plusIcon";
import style from "../../../styles/components/faqBoard.module.css";

interface FaqBoardProps {
  faq: FAQ[];
}

export const FaqBoard: FC<FaqBoardProps> = ({ faq }) => {
  return (
    <div className={`${style.container} flex flex-col justify-center items-start p-4`}>
      <h4>Frequently asked question</h4>
      <div className="mt-5">
        {faq.map((faq, index) => (
          <Accordion className="bg-transparent shadow-none" key={faq.question} disableGutters={true} square>
            <AccordionSummary expandIcon={
              <div className={style.button}>
                <PlusIcon width="10" />
              </div>
            }>
              <div className="flex flex-row justify-start items-center py-5">
                <h2 className={style.title}>{`0${index + 1}`}</h2>
                <p className="text-default ml-6 text-left">{faq.question}</p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-sm text-left">{faq.answer}</p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  )
}