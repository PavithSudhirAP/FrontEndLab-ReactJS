import IDataList from "../Model/IDataList";
import { getDataFromServer } from "../Services/Menu";
import { useState, useEffect } from "react";
import Form from "./ExpenseTracker";

function ShowData() {

    const [items, setItems] = useState<IDataList[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [sum, setSum] = useState<number | null>()
    const [pavithspent, setpavithspent] = useState<number>(0)
    const [castrospent, setcastrospent] = useState<number>(0)

    let pavithspent1 : number = 0;
    let castrospent1 : number = 0;

    useEffect(
        () => {
            const getData = async () => {
                const data = await getDataFromServer();
                setItems(data);
                setSum(data.reduce((result,v) =>  result = result + v.price , 0 ));
                Shares(data);

            }
            getData();
        },
        [showForm]
    );

    const Shares = (data :IDataList[]) =>{
    
        data.map(
            sams => (
                sams.payeeName === "Pavith" ? (
                    pavithspent1 = pavithspent1 + sams.price
                ):
                (
                    castrospent1 = castrospent1 + sams.price
                )
            )
        )
        setpavithspent(pavithspent1)
        setcastrospent(castrospent1)
    }

    const success =() => {
        setShowForm(false)
    }
    const cancel = () => {
        setShowForm(false)
    }


    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
            {
                showForm && (
                    <div className="form">
                        <Form onTrue={success} onClose = {cancel}/>
                    </div>
                )
            }
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{width: 112}}>Payee</div>
            </>
            {
                items && (
                    items.map( (user, idx) => {
                        return(
                            <div key={idx}>
                                <div className="use-inline date">{user.setDate}</div>
                                <div className="use-inline">{user.product}</div>
                                <div className="use-inline price">{user.price}</div>
                                <div className="use-inline" style={{width: 112}}>{user.payeeName}</div>
                            </div>
                        )
                    } )
                )
            }
            <hr/>
            <div className="use-inline ">Total: </div>
            <span className="use-inline total">{sum}</span> <br />
            <div className="use-inline ">pavith paid: </div>
            <span className="use-inline total pavith">{pavithspent}</span> <br />
            <div className="use-inline ">castro paid: </div>
            <span className="use-inline total castro">{castrospent}</span> <br />
            <span className="use-inline payable">{pavithspent>castrospent? "Pay pavith " : "Pay castro"}</span>
            <span className="use-inline payable price"> {Math.abs((pavithspent-castrospent)/2)}</span>
            
        </>
    )

}

export default ShowData;
