import "./LoanCalculator.css";
import LoanJS from "loanjs";
import { useState } from "react";

export default function LoanCalculator() {
  const [values, setValues] = useState({
    "kredi-miktari": 0,
    "taksit-araligi": 0,
    "faiz-orani": 0,
  });
  const [installments, setInstallments] = useState([]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    calculate(
      values["kredi-miktari"],
      values["taksit-araligi"],
      values["faiz-orani"]
    );
  };

  const calculate = (amount: number, years: number, rate: number) => {
    const loan = new LoanJS.Loan(amount, years * 12, rate);

    setInstallments(loan.installments);
  };

  const amountFormat = (amount: number) => //para birimiyle biçimlendirme yapıldı
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "TRY",
    }).format(amount);

  return (
    <div className="loan-calculator-container">
      <h1>Kredi Hesaplama Aracı</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="kredi-miktari">Ana Para</label>
          <div className="form-input">
            <input
              type="number"
              name="kredi-miktari"
              placeholder="0"
              value={values["kredi-miktari"]}
              onChange={handleInputChange} //Giriş güncellemeleri onChange ile yönetildi
            />
          </div>
        </div>
        <div className="form-item">
          <label htmlFor="faiz-orani">Faiz Oranı</label>
          <div className="form-input">
            <input
              type="number"
              name="faiz-orani"
              placeholder="0"
              value={values["faiz-orani"]}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-item">
          <label htmlFor="taksit-araligi">Geri Ödeme Süresi (Yıl)</label>
          <div className="form-input">
            <input
              type="number"
              name="taksit-araligi"
              placeholder="0"
              value={values["taksit-araligi"]}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-action">
          <input
            type="submit"
            value="Hesapla"
            className="calculate-button"
          ></input>
        </div>
      </form>

      {!!installments?.length && (
        <table>
          <thead>
            <tr>
              <th>Ay</th>
              <th>Ödeme Tutarı</th>
              <th>Faiz Ödemesi</th>
              <th>Ödenen Tutar</th>
              <th>Kalan Tutar</th>
            </tr>
            </thead>
            <tbody>
            {installments.map((i: any, ind: number) => (
              <tr key={ind}>
                <td>{ind+ 1}</td>
                <td>{amountFormat(i.installment)}</td>
                <td>{amountFormat(i.interest)}</td>
                <td>{amountFormat(i.capital)}</td>
                <td>{amountFormat(i.remain)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}