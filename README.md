Отображение объектов на карте

При выполнении использовать: JavaScript, Vue 3, HTML, CSS
Библиотека для работы с картой: https://leafletjs.com
Имитация бекенда: https://jsonplaceholder.typicode.com

Задача
Реализовать приложение, в котором отображается:

1.карта с нанесенными на нее маркерами пользователей.
2.список пользователей (рядом или под картой). Обязательные поля для отображения в списке - имя, username, телефон, email
3.форма для добавления нового пользователя
4.Данные пользователей доступны по ссылке https://jsonplaceholder.typicode.com/users

Требования к функционалу
1. По нажатию на пользователя из списка он становится выбранным (появляется какой-то отличительный признак, например, подсветка), вместе с 
этим карта изменяет масштаб и центрируется на маркере этого пользователя.
2. Для отображения профилей на карте, используйте lat (широту) и lng (долготу), которые есть в информации у каждого профиля.
3. У списка пользователей должна быть кнопка для удаления. При нажатии на которую пользователь удаляется из списка и из карты.
4. При нажатии на маркер на карте необходимо, чтобы появлялось попап окно с полной информацией о профиле. Поля, которые там должны присутствовать:
name
username
email
address (всё, кроме geo)
phone
website
company.name
5. В этом попап окне также должна присутствовать кнопка “Highlight”, по нажатию на которую, профиль в списке будет подсвечиваться 
или как-то визуально отличаться (на Ваше усмотрение)
6. Также где-то на странице создайте форму для создания нового пользователя. Какие поля должны быть обязательными, а какие нет - на Ваше усмотрение.
Главное, чтобы после добавления нового пользователя, он появлялся в списке пользователей и на карте. Список возможных полей доступен по ссылке https://jsonplaceholder.typicode.com/users/1
7. Если пользователей в списке больше 12, то должна появляться пагинация.
8. Требования к верстке и дизайну. Верстка должна быть адаптивной. Дизайн на Ваше усмотрение.


