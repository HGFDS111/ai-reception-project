import { useGetDialogueScriptsQuery } from '../../entities/dialogueScript/dialogueScriptApi'

function DialogueScriptsPage() {
  const {
    data: dialogueScripts,
    isLoading,
    error,
  } = useGetDialogueScriptsQuery()

  if (isLoading) {
    return <p>Loading dialogue scripts...</p>
  }

  if (error) {
    return <p>Failed to load dialogue scripts</p>
  }

  return (
    <main>
      <h1>Dialogue Scripts</h1>
      <p>Dialogue scripts found: {dialogueScripts?.length ?? 0}</p>
    </main>
  )
}

export default DialogueScriptsPage