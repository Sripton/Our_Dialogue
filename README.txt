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



🧠 Почему не нужно добавлять posttitle в зависимости, если ты передаёшь его аргументом в функцию
🔹 Потому что posttitle не замыкается внутри функции
const submitPostHandler = useCallback(async (e, posttitle) => {
  // здесь  используeтся `posttitle`, который передаётся ВНУТРЬ функции
  // а не берётся из внешнего scope (из стейта `inputs`)
}, []);
Т.е. submitPostHandler не зависит от inputs.posttitle
Просто получаем его из аргумента — и всё ✅


🚨 А если делать так:
const submitPostHandler = useCallback(async (e) => {
  const posttitle = inputs.posttitle; // ← используется переменная из scope
}, []);

👉 Тогда inputs.posttitle замыкается в момент создания функции,
и чтобы React пересоздавал submitPostHandler при его изменении,
 обязательно надо писать [inputs.posttitle] в зависимостях.

🔁 Простыми словами:
Сценарий	Нужно в [deps]?
Используешь переменную внутри функции из родительского scope	✅ Да
Передаёшь её в аргументах	❌ Нет

✅ Поэтому  код:
const submitPostHandler = useCallback(async (e, posttitle) => {
  // тут posttitle НЕ из useState — это аргумент
}, []);
может спокойно иметь пустой массив зависимостей [] — это безопасно и правильно.


🔧 Пример 1: Замыкание — доступ к внешней переменной
let message = "Hello";

function sayHi() {
  console.log(message); // берет `message` из внешнего scope
}

sayHi(); // → Hello

message = "Привет";

sayHi(); // → Привет ✅

Функция sayHi замыкает переменную message, и будет брать её всегда актуальной, 
потому что она не копирует значение, а ссылается на переменную


🔧 Пример 2: Замыкание замораживается в момент создания
Теперь — аналогия с useCallback:

function makeGreeter(greeting) {
  return function () {
    console.log(greeting); // ← это замыкание: greeting зафиксировано!
  };
}

const greetHello = makeGreeter("Hello");
const greetHi = makeGreeter("Hi");

greetHello(); // → Hello
greetHi();    // → Hi

Здесь greeting попадает внутрь функции и "запоминается" — как и inputs.posttitle внутри useCallback


🔁 В контексте React:
❌ Так делать нужно с зависимостями:
const submitPostHandler = useCallback(() => {
  // замыкание на inputs.posttitle!
  fetch("/api", {
    body: JSON.stringify({ posttitle: inputs.posttitle }),
  });
}, [inputs.posttitle]); // ← обязательно!

✅ А так — не нужно зависимостей:
const submitPostHandler = useCallback((e, posttitle) => {
  // никаких замыканий, всё приходит через аргумент
  fetch("/api", {
    body: JSON.stringify({ posttitle }),
  });
}, []); // ← можно оставить пустым




🔍 Когда имеет смысл оборачивать inputPostHandler в useCallback?
✅ Оборачивать имеет смысл, если:
Postform обёрнут в React.memo
Если хочешь предотвратить его лишние ререндеры
И inputPostHandler передаётся в него как пропс

💡 А если?
Postform — не обёрнут в React.memo → значит всё равно ререндерится при каждом изменении inputs
Следовательно: useCallback на inputPostHandler не даёт никакой пользы


🧠 Более того:
const inputPostHandler = useCallback((e) => {
  const { name, value } = e.target;
  setInputs((prev) => ({ ...prev, [name]: value }));
}, []);
[] — значит, функция никогда не будет обновляться,
но если вдруг в будущем изменить setInputs, это может вызвать баг.


✅ Лучшее решение для твоего случая
Если  не оборачивать Postform в React.memo,
то оставить обычную функцию:

const inputPostHandler = (e) => {
  const { name, value } = e.target;
  setInputs((prev) => ({ ...prev, [name]: value }));
};
Это проще, безопаснее и не создаёт ложного ощущения оптимизации.


📌 Когда всё же оборачивать?
const inputPostHandler = useCallback((e) => {
  ...
}, [setInputs]);
И только если Postform будет обёрнут в memo():

export default memo(Postform);

✍ Вывод:
Ситуация	Нужно useCallback?
Postform НЕ в memo	❌ Нет смысла
Postform В memo, и ты сравниваешь props	✅ Да, чтобы не пересоздавалась




Проблема с которой я столкнуля при разделении логики (создания) комментариев  (отображения, редактирвоания, удаления)
 ✅ Лучшее решение: использовать useImperativeHandle + forwardRef
Это стандартный, правильный способ передать внешнему компоненту контроль над внутренним состоянием.
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

const CommentSection = forwardRef(({ post, userIDsession }, ref) => {
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    fetch(`/api/comments/${post.id}`)
      .then((res) => res.json())
      .then((data) => setAllComments(data))
      .catch(console.log);
  }, [post.id]);

  // Экспортируем наружу setAllComments
  useImperativeHandle(ref, () => ({
    // Функция для добавления комментария
    addComment: (newComment) => {
      setAllComments((prev) => [...prev, newComment]);
    },
    🔹 Этот метод заменяет весь список комментариев на новый list.
    setComments: (list) => {
      setAllComments(list);
    },
    📌 Зачем это может понадобиться?
✅ 1. Обновить все комментарии после редактирования / удаления
// Например:
// удалил комментарий,
// получил новый список с сервера,
// и хочешь сразу перезаписать весь allComments.
// Пример
// const updatedList = await fetchUpdatedComments();
// commentRef.current.setComments(updatedList);

✅ 3. Сброс комментариев (например, при смене поста)
// commentRef.current.setComments([]);
  }));

  return (
    <>
      {allComments.map((comment) => (
        <div key={comment.id}>{comment.commenttitle}</div>
      ))}
    </>
  );
});

export default CommentSection;



После перенесения состояния   const [allComments, setAllComments] = useState([]);
в Postcard.jsx стоит вопрос перерндеринга страницы. На данном этапе когда комментариев мало,  
Это нормальный процесс. Но проблема перерендеринга 
возникает после того как растут ко-во комментариев. Для этого буду использовать react-window
react-window - виртуализирует список. отображает только те элементы, которые видимы на экране, а не весь массив.
Устанавливаю библиотеку npm install react-window

