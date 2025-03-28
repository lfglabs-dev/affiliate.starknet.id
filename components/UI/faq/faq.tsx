import { FC } from "react";
import { FAQ } from "../../../types/faq/types";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import PlusIcon from "../iconsComponents/icons/plusIcon";

interface FaqBoardProps {
	faq: FAQ[];
}

export const FaqBoard: FC<FaqBoardProps> = ({ faq }) => {
	return (
		<div className="w-11/12  mx-auto bg-[#ffffff] rounded-lg p-8 overflow-hidden mb-10">
			<div className="mb-8">
				<h1 className="text-3xl font-extrabold text-center">FREQUENTLY ASKED QUESTION</h1>
			</div>

			<div className="space-y-6 shadow-[0px_14px_39px_0px_rgba(0,0,0,0.1)] px-[24px] pt-[24px] mb-10">
				{faq.slice(0, -1).map((faq, index) => (
					<div key={index} className="border-b border-gray-100 pb-4">
						<Accordion
							className="bg-transparent shadow-none before:hidden"
							sx={{
								"&::before": {
									backgroundColor: "#000",
								},
							}}
							disableGutters={true}
							square>
							<AccordionSummary
								expandIcon={
									<div className="w-6 h-6 flex items-center justify-center border border-gray-600 rounded-md ">
										<PlusIcon width="10" />
									</div>
								}
								className="p-0 hover:bg-transparent min-h-0">
								<div className="flex items-center gap-4">
									<h1 className="text-3xl font-extrabold text-center">{String(index + 1).padStart(2, "0")}</h1>
									<p className="text-lg font-medium text-gray-800">{faq.question}</p>
								</div>
							</AccordionSummary>
							<AccordionDetails className="pl-[64px] pt-2 pb-4">
								<p className="text-gray-600 text-left">{faq.answer}</p>
							</AccordionDetails>
						</Accordion>
					</div>
				))}
			</div>
		</div>
	);
};
