import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from '../controls/Input'
import Month from "../controls/Month";
import { encryptPassword } from "./decryptAndEncrypt"

const AskQuestion = () => {
    const [input, setInput] = useState({
        cardNo: "",
        nameOfCard: "",
        expireDate: "",
        cvc: ""
    })

    const [errors, setErrors] = useState({});

    const validate = (fieldValues = input) => {
        let temp = { ...errors }
        if ('cardNo' in fieldValues)
            if (fieldValues.cardNo.length < 16) {
                temp.cardNo = "The card No should be 16 number"
            } else if (fieldValues.cardNo.length > 16) {
                temp.cardNo = "The card No should be 16 number"
            }
            else {
                temp.cardNo = ""
            }
        if ('nameOfCard' in fieldValues)
            temp.nameOfCard = fieldValues.nameOfCard ? "" : "This field is required."
        if ('expireDate' in fieldValues)
            temp.expireDate = fieldValues.expireDate ? "" : "This field is required."
        if ('cvc' in fieldValues)


            if (fieldValues.cvc.length < 3) {
                temp.cvc = "The cvc no should have 3 numbers"
            } else if (fieldValues.cvc.length > 3) {
                temp.cvc = "The cvc no should have 3 numbers"
            }
            else {
                temp.cvc = ""
            }

        setErrors({
            ...temp
        })
        if (fieldValues == input)
            return Object.values(temp).every(x => x == "")


    }


    const handleInputChange = (e) => {

        let { name, value } = e.target;
        setInput({ ...input, [name]: value })
        validate({ [name]: value })

    }





    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validate()) {
            try {



                var todaysDate = new Date();
                todaysDate.setMonth(todaysDate.getMonth() + 12);
                let values = {
                    subscribeId:0,
                    startDate: formatDate(new Date()),
                    cardNo: encryptPassword(input.cardNo),
                    packagesId: 1,
                    serviceProviderId: localStorage.getItem("userId"),
                    endDate: formatDate(todaysDate),
                    quotationcount:250
                }

                console.log(values);
                const headers = {
                    'Content-Type': 'application/json'
                };
                var res2 = await axios.post("http://localhost:9000/subscribe/addSubscribe", values, { headers });
                alert(res2.data);
            } catch (ex) {
                console.log(ex);
            }






        }
    }

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }




    return (
        <div>

            <form onSubmit={handleSubmit} autoComplete="off">

                <Input
                    id="cardNo"
                    value={input.cardNo}
                    handleInputChange={handleInputChange}
                    placeholder="Enter cardNo......"
                    errors={errors.cardNo}
                />
                <Input
                    id="nameOfCard"
                    value={input.nameOfCard}
                    handleInputChange={handleInputChange}
                    placeholder="Enter nameOfCard......"
                    errors={errors.nameOfCard}
                />

                <Month
                    id="expireDate"
                    value={input.expireDate}
                    handleInputChange={handleInputChange}
                    placeholder="Enter expireDate......"
                    errors={errors.expireDate}
                />

                <Input
                    id="cvc"
                    value={input.cvc}
                    handleInputChange={handleInputChange}
                    placeholder="Enter cvc......"
                    errors={errors.cvc}
                />

                <button type="submit" class="btn btn-primary" style={{ margin: '30px' }}>Submit</button>

            </form>
        </div>
    );
}
export default AskQuestion;