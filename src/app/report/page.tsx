import style from "./report.module.css";
import Navbar from "../components/Navbar";

export default function ReportGenerator() {
    return <div>
        <Navbar></Navbar>
        <div className={style.reportPage}>
        
        <h1 className={style.header}>Generate PDF</h1>
        <p className={style.subheader}>Select Date</p>

        <div className={style.dateEntry}>
        <input className={style.dateItem} type="date" id="from" min="2010-01-01" required></input>
        <p style={{marginRight: 20}}>to</p>
        <input className={style.dateItem} type="date" id="to" min="2010-01-01" required></input>
        </div>

        <button className={style.createButton}>Create PDF</button>
        </div>
        </div>;
  }