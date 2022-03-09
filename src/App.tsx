import WordRow from './components/WordRow/WordRow'

function App() {

  return (
    <div className="mx-auto w-96">
      <header className="border-b border-grey-500 pb-2 mb-2">
        <h1 className="text-6xl text-center">Wordle clone</h1>
      </header>

      <main>
        <WordRow letters="hel" />
        <WordRow letters="hell" />
        <WordRow letters="hello" />
      </main>
    </div>
  )
}

export default App
