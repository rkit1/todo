import { effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProvider {
  private readonly data_: WritableSignal<Schema>;

  readonly data: Signal<Schema>;

  constructor() {
    const data = JSON.parse(localStorage.getItem('todo-data')!) as Schema;
    this.data_ = signal(data || initial);
    this.data = this.data_.asReadonly();

    effect(() => {
      localStorage.setItem('todo-data', JSON.stringify(this.data_()));
    })
  }

  createTask(task: Task) {
    this.data_.update((data) => {
      return {
        ...data,
        tasks: [task, ...data.tasks]
      }
    })
  }

  updateTask(task: Task) {
    this.data_.update((data) => {
      return {
        ...data,
        tasks: data.tasks.map((t) => {
          if (t.id === task.id) {
            return task;
          }
          return t;
        })
      }
    })
  }

  deleteTask(id: number) {
    this.data_.update((data) => {
      return {
        ...data,
        tasks: data.tasks.filter((t) => t.id !== id)
      }
    })
  }

}


export interface Schema {
  tasks: Task[],
};

export interface Task {
  id: number,
  title: string,
  description: string,
  status: 'complete' | 'incomplete',
}


const initial: Schema = {
  tasks: [
    {
      title: 'Обновить сайт компании',
      description: 'Пересмотреть текущий дизайн и внести необходимые изменения для улучшения пользовательского опыта, а также обновить информацию о продукции и услугах',
      status: 'incomplete',
      id: 1
    },
    {
      title: 'Разработать маркетинговую стратегию',
      description: 'Создать план продвижения бренда на ближайшие шесть месяцев, определить целевые аудитории, каналы коммуникации и ключевые сообщения\nСоздать план продвижения бренда на ближайшие шесть месяцев, определить целевые аудитории, каналы коммуникации и ключевые сообщения\n',
      status: 'incomplete',
      id: 2
    },
    {
      title: 'Провести аудит безопасности',
      description: 'Проверить текущие системы защиты информации, выявить уязвимости и предложить меры по их устранению для обеспечения безопасности данных',
      status: 'complete',
      id: 3
    },
    {
      title: 'Организовать командный тренинг',
      description: 'Подготовить программу обучения по командной работе и коммуникациям, провести тренинг для сотрудников с целью повышения эффективности взаимодействия.',
      status: 'incomplete',
      id: 4
    },
    {
      title: 'Написать отчет по проекту',
      description: 'Собрать результаты выполненных задач, проанализировать достижения и проблемы, подготовить документацию для руководства.',
      status: 'incomplete',
      id: 5
    },
  ]
}