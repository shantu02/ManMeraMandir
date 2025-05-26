
import { ExportUnionTypes } from "@/types/export_type_unions"
import ButtonComponent from "../ui/ButtonComponent"
import { formatCreatedAtDate } from "@/lib/utils"
import { useState } from "react"
import { Spinner } from "../ui/Spinner"



interface DataExportType{
    data: ExportUnionTypes[] | undefined,
    dataSourceArray: string[] | undefined,
    startDate: Date,
    endDate: Date,
    pageName: string
}


const DataExport = ({data, dataSourceArray, startDate, endDate, pageName} : DataExportType) => {

    const [pending, setPending] = useState(false);

    const handleExport = async() => {
        // Function to convert array of objects to CSV format
        const convertToCSV = () => {
            if(data){
                const header = Object.keys(data[0] as keyof ExportUnionTypes) as (keyof ExportUnionTypes)[];
                const rows = data?.map(obj =>
                    header.map(fieldName => {
                        let fieldValue = obj?.[fieldName as keyof ExportUnionTypes] as string | undefined;
                        if(fieldValue!==undefined && fieldName == 'created_at'){
                            fieldValue = formatCreatedAtDate(new Date(fieldValue as string));
                        }
                        return JSON.stringify(fieldValue, (key, value) => (value === null ? '' : value));
                    }).join(',')
                );
                // return [header.join(','), ...rows].join('\n');
                return [
                    `Page Name:,${pageName}`,
                    `Data Sources:,${dataSourceArray?.join('; ')}`,
                    `Start Date:,${formatCreatedAtDate(startDate)}`,
                    `End Date:,${formatCreatedAtDate(endDate)}`,
                    '', // empty line
                    '', // another empty line
                    header.join(','), // CSV header row
                    ...rows           // CSV data rows
                ].join('\n');
            }
        };

        // fileName
        const generateFileName = () => {
            const formatDateString = (date: Date) => {
                const dd = String(date.getDate()).padStart(2, '0');
                const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                const yyyy = date.getFullYear();
                return `${dd}${mm}${yyyy}`;
            }
            
            return `${pageName.replaceAll(" ", "")}_${formatDateString(startDate)}_${formatDateString(endDate)}`
        }

        // Function to trigger download of CSV file
        const downloadCSV = async () => {
            const csv = convertToCSV();
            if(csv){
                const blob = new Blob([csv], { type: 'text/csv' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = generateFileName();
                link.click();
            }
        };

        // show pending and download
        setPending(true);
        await downloadCSV();
        setPending(false);
    }

    return (
        <div>
            <ButtonComponent text={"Export"} onClick={handleExport} exportBtn={true} />
            {pending && <Spinner />}
        </div>
    )
}

export default DataExport