# ToDoBoard

**ToDoBoard** — это адаптивное приложение для управления задачами, реализованное с использованием React и TypeScript. Проект демонстрирует современные подходы в разработке фронтенд-приложений, включая:

- Управление досками (boards) и задачами (cards) с независимым состоянием;
- Возможность редактирования названий досок после их создания;
- Добавление, изменение и удаление задач;
- Переключение статуса задачи с использованием интуитивных иконок (Check / Cicle);
- Реализацию функциональности перетаскивания карточек (drag-and-drop) для удобного изменения порядка задач.
- Возможность менять со светлой на темную тему

## Особенности проекта

- **Создание и управление досками:**  
  Пользователь может добавлять новые доски, редактировать их названия после создания и удалять их. Название доски можно изменять путём клика по нему, после чего оно превращается в поле ввода, позволяющее задать новое значение.

- **Работа с задачами:**  
  В каждой доске можно добавлять задачи с заголовком и подробным описанием. Каждая задача имеет иконку, показывающую её состояние (выполнена или нет). При нажатии на иконку состояние переключается – от неподтверждённого (иконка Cicle) к подтверждённому (иконка Check) и наоборот.

- **Перетаскивание карточек:**  
  Реализована функциональность drag-and-drop, позволяющая изменять порядок задач внутри доски. В будущем планируется расширить функционал перетаскивания для поддержки перемещения задач между досками.

- **Адаптивный дизайн:**  
  Приложение оптимизировано для работы на различных устройствах, обеспечивая удобное управление задачами и досками на мобильных и десктопных платформах.

## Стек технологий

- **React** – библиотека для создания динамичных пользовательских интерфейсов.
- **TypeScript** – обеспечивает статическую типизацию, что повышает надежность и качество кода.
- **CSS Modules** – для модульных и изолированных стилей.
- **Git & GitHub** – для контроля версий и совместной разработки.
- **Библиотека Drag-and-Drop** – (например, [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) или [react-dnd](https://react-dnd.github.io/react-dnd/about)) для реализации перетаскивания карточек.

## Структура проекта

- **Main:**  
  Главный компонент, который управляет списком досок и глобальными задачами, а также содержит функции для добавления, удаления и обновления досок и задач.

- **CartTodo:**  
  Компонент, отвечающий за отображение отдельной доски. Внутри каждой доски реализована форма для добавления новых задач, редактирования названия доски и управления локальным состоянием задач.

- **AddNewCart:**  
  Компонент для отображения списка задач, принадлежащих конкретной доске. Позволяет переключать состояние задачи (completed) посредством клика по иконке.

