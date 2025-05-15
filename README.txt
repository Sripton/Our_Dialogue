📌 Почему всё ещё происходит ререндер Addposts
Я пишу:
export default memo(Addposts);

Но Addposts получает:
props: {
  id,
  inputs,              // объект — новая ссылка при любом setInputs
  inputPostHandler,    // useCallback — ок
  submitPostHandler,   // useCallback зависит от inputs => новая ссылка при каждом вводе
  filteredPosts        // useMemo зависит от posts => новая ссылка при каждом новом посте
}

🔴 Значит: memo не помогает, потому что props-ссылки меняются каждый раз.
