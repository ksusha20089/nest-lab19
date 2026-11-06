export class UpdateTaskDto {
  title?: string;       // При обновлении можно передать только часть полей
  description?: string; // Добавили опциональное поле
  completed?: boolean;  // Тоже сделали необязательным для удобства
}