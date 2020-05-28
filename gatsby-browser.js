export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Le site internet a été mis à jour ` +
      `Souhaitez-vous recharger la page pour voir la dernière version ?`
  )
  if (answer === true) {
    window.location.reload()
  }
}