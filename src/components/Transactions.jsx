import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../styles/components/newtransaction.sass";
import "../styles/components/transactions.sass";
import { BiRefresh as RefreshIcon } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";

export default function Transactions() {
  const [transactionType, setTransactionType] = useState("compra");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [localTransaction, setLocalTransaction] = useState([]);
  const [valorTotal, setValorTotal] = useState();
  const [finalStatus, setFinalStatus] = useState("Sem transações registradas.");

  var transactions = [];

  async function loadTransactions() {
    if (localStorage.hasOwnProperty("transactions")) {
      setLocalTransaction(
        (transactions = await JSON.parse(localStorage.getItem("transactions")))
      );
      var resultValue = localTransaction.reduce((acc, p) => {
        let accTreated = Number(acc);
        if (p.transactionType === "compra") {
          return Number(accTreated) + Number(p.itemPrice);
        } else if (p.transactionType === "venda") {
          return Number(accTreated) - Number(p.itemPrice);
        } else {
          return accTreated;
        }
      }, 0);
      getFinalStatus();
      setValorTotal(resultValue);
    }
  }

  function handleSave(e) {
    if (itemPrice && itemName) {
      e.preventDefault();
      if (localStorage.hasOwnProperty("transactions")) {
        transactions = JSON.parse(localStorage.getItem("transactions"));
      }
      transactions.push({ itemName, itemPrice, transactionType });
      localStorage.setItem("transactions", JSON.stringify(transactions));
      toast("Transação adicionada com sucesso !");
    } else {
      toast.error("Nome e valor são obrigatórios !");
    }
    loadTransactions();
  }

  function handleChange(e) {
    setTransactionType(e.target.value);
    console.log(transactionType);
  }

  function getFinalStatus() {
    if (valorTotal <= 0) {
      setFinalStatus("[Prejuízo]");
    } else {
      setFinalStatus("[Lucro]");
    }
  }

  useEffect(() => {
    loadTransactions();
  }, [valorTotal]);

  return (
    <>
      <form className="transaction-form">
        <label htmlFor="">Tipo de transação</label>
        <select
          onChange={handleChange}
          name="transactionType"
          id="transactionType"
        >
          <option value="compra">Compra</option>
          <option value="venda">Venda</option>
        </select>
        <label htmlFor="">Nome da mercadoria</label>
        <input
          maxLength={32}
          type="text"
          placeholder="Entrada"
          onChange={(e) => setItemName(e.target.value)}
        />
        <label htmlFor="">Valor</label>

        <input
          type="number"
          value={itemPrice}
          placeholder="R$ 0,00"
          onChange={(e) => setItemPrice(e.target.value)}
        />

        <button onClick={handleSave}>Adicionar transação</button>
        <hr />
      </form>

      <h1>Extrato de transações</h1>
      <div className="refres-btn-container">
        <button className="refresh-btn" onClick={loadTransactions}>
          <RefreshIcon />
          Atualizar
        </button>
      </div>
      <div className="transactions-container">
        <table className="transactions-content">
          <thead>
            <tr className="table-head">
              <td>Mercadoria</td>
              <td>Valor</td>
            </tr>
          </thead>
          <tbody className="table-body">
            {localTransaction.map((transaction, idx) => {
              return (
                <>
                  <tr key={idx}>
                    <td>
                      <span>
                        {transaction.transactionType === "compra" ? "+" : "-"}{" "}
                      </span>
                      {transaction.itemName}
                    </td>
                    <td>
                      <span>R$ </span>
                      {transaction.itemPrice}
                    </td>
                  </tr>
                </>
              );
            })}

            <tr className="total-table">
              <td>Total</td>
              <td>R$ {valorTotal} </td>
            </tr>
          </tbody>
        </table>
        <ToastContainer />
      </div>
      <div>
        <span className="lucro">{finalStatus}</span>
      </div>
    </>
  );
}
