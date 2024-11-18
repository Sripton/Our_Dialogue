const submitLikesHandler = async (id, isPost) => {
  try {
    // Отправляем POST-запрос на сервер для создания лайка
    const response = await fetch(`/api/likes/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      // Парсим ответ, который содержит данные о созданном лайке
      const newLike = await response.json();

      if (isPost) {
        // Обновление состояния лайков для поста
        setLike((prevLikes) => [...prevLikes, newLike]);
      } else {
        // Обновление состояния лайков для комментариев
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === id
              ? {
                  ...comment,
                  likes: [...(comment.likes || []), newLike],
                }
              : comment
          )
        );
      }
    } else {
      console.error("Ошибка при добавлении лайка");
    }
  } catch (error) {
    console.error("Произошла ошибка при отправке лайка:", error);
  }
};
Пояснение:
Запрос на сервер: Функция отправляет POST-запрос на маршрут /api/likes/${id}, где id — это идентификатор поста или комментария.
Ответ сервера: Если запрос успешен (response.ok), функция получает данные о новом лайке (newLike) и обновляет состояние.
Обновление состояния:
Если isPost равен true, состояние лайков поста обновляется с добавлением нового лайка.
Если isPost равен false, обновляется массив комментариев, добавляя новый лайк в соответствующий комментарий.
Обработка ошибок: Если возникает ошибка во время выполнения запроса, она логируется в консоль.
Как использовать:
Вызывайте функцию submitLikesHandler при нажатии на кнопку лайка для поста или комментария:

<button onClick={() => submitLikesHandler(post.id, true)}>Like Post</button>
<button onClick={() => submitLikesHandler(comment.id, false)}>Like Comment</button>
Маршрут в Express:
Ваш Express-маршрут уже корректно обрабатывает запросы на создание лайков, проверяет, существует ли пост или комментарий с заданным id, и создаёт запись в таблице Likes.



likes: [...(comment.likes || []), newLike],
эта часть кода обновляет массив лайков для конкретного комментария, добавляя новый лайк (newLike). Давайте разберем этот фрагмент:

comment.likes || []: проверяется, существует ли поле likes у объекта comment. Если оно существует, используется его значение; если нет — используется пустой массив ([]), чтобы избежать ошибки при попытке деструктуризации undefined.
[...comment.likes, newLike]: оператор ... (spread) разворачивает существующий массив likes, и добавляется новый элемент newLike.
Что делать, если в таблице Comment нет поля likes?
Если в таблице Comment нет поля likes, вам нужно изменить структуру данных и логику приложения, чтобы обрабатывать количество лайков иначе:

Создайте связь через таблицу Likes:
Убедитесь, что для каждого комментария можно подсчитать количество лайков, делая запросы к таблице Likes.
Обновите логику клиентской части:
Вместо того чтобы использовать comment.likes, можно использовать метод подсчета лайков на основе данных из таблицы Likes.
Обновленная функция обновления состояния:
Если у комментариев нет поля likes, можно пересчитать количество лайков при каждом обновлении:

const submitLikesHandler = async (id, isPost) => {
  try {
    const response = await fetch(`/api/likes/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      const newLike = await response.json();

      if (isPost) {
        setLike((prevLikes) => [...prevLikes, newLike]);
      } else {
        // Обновляем количество лайков, если поле likes отсутствует
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === id
              ? {
                  ...comment,
                  likeCount: (comment.likeCount || 0) + 1, // Добавляем поле для отображения количества лайков
                }
              : comment
          )
        );
      }
    } else {
      console.error("Ошибка при добавлении лайка");
    }
  } catch (error) {
    console.error("Произошла ошибка при отправке лайка:", error);
  }
};

Изменения:
likeCount: Вместо массива likes используется likeCount, представляющий количество лайков. Это значение можно вычислять на основе запроса к таблице Likes.
Запрос к серверу: На стороне сервера, когда лайк добавляется, можно возвращать общее количество лайков для данного комментария или поста, чтобы обновлять его в клиентской части.
Таким образом, если в таблице Comment нет поля likes, необходимо использовать поле likeCount или аналогичный метод подсчета лайков на основе данных из таблицы Likes.
