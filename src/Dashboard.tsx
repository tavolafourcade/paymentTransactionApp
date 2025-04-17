import { useEffect, useMemo, useState } from "react"

interface MockData {
  id: string
  date: string
  description: string
  amount: number
}

const mockData: MockData[] = [
  {id: 'T001', date:'2025-04-17', description:'First payment', amount:2000},
  {id: 'T002', date:'2025-04-13', description:'Second payment', amount:1200},
  {id: 'T003', date:'2025-04-14', description:'Third payment', amount:4543},
  {id: 'T004', date:'2025-04-10', description:'Fourth payment', amount:129},
]

const Dashboard = () => {
  const [transactions, setTransactions] = useState<MockData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  console.log(mockData)

  useEffect(() => {
    try {
      setTimeout(() => {
        setTransactions(mockData)
      },500)
    } catch (error) {
      console.error(error)
      setError('Failed to fetch the transaction array')
    }
  },[])

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const txDate = new Date(tx.date).getTime()
      const from = startDate ? new Date(startDate).getTime() : -Infinity
      const to = endDate ? new Date(endDate).getTime() : Infinity

      return txDate >= from && txDate <= to
    })
  }, [transactions, startDate, endDate])

  const totalAmount = useMemo(
    () => filteredTransactions.reduce((sum,tx) => sum + tx.amount, 0),[filteredTransactions]
  )

  return (
<div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Payment Transaction Dashboard</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <label className="flex flex-col text-sm">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 border border-gray-300 rounded px-2 py-1"
          />
        </label>

        <label className="flex flex-col text-sm">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 border border-gray-300 rounded px-2 py-1"
          />
        </label>
      </div>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-6">
        <p className="text-gray-700">Total Transactions: <span className="font-semibold">{filteredTransactions.length}</span></p>
        <p className="text-gray-700">Total Amount: <span className="font-semibold">${totalAmount}</span></p>
      </div>

      <div className="overflow-x-auto rounded-md">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Description</th>
              <th className="text-left px-4 py-2">Amount (USD)</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="even:bg-gray-50">
                <td className="px-4 py-2">{tx.id}</td>
                <td className="px-4 py-2">{tx.date}</td>
                <td className="px-4 py-2">{tx.description}</td>
                <td className="px-4 py-2">${tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
