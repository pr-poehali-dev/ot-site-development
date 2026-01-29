import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { title: 'Актуальных НПА', value: '247', icon: 'FileText', change: '+12 за месяц', color: 'text-primary' },
    { title: 'Сотрудников обучено', value: '89%', icon: 'Users', change: '156 из 175', color: 'text-secondary' },
    { title: 'Документов создано', value: '43', icon: 'FileCheck', change: 'За этот месяц', color: 'text-accent' },
    { title: 'Уведомлений', value: '8', icon: 'Bell', change: 'Требуют внимания', color: 'text-destructive' },
  ];

  const npaCategories = [
    { name: 'Трудовой кодекс РФ', docs: 45, updated: '15.01.2026', icon: 'BookOpen' },
    { name: 'Федеральные законы', docs: 38, updated: '20.01.2026', icon: 'Scale' },
    { name: 'Приказы Минтруда', docs: 67, updated: '28.01.2026', icon: 'FileText' },
    { name: 'ГОСТы и СП', docs: 54, updated: '10.01.2026', icon: 'FileStack' },
    { name: 'СанПиНы', docs: 23, updated: '05.01.2026', icon: 'Heart' },
    { name: 'Отраслевые нормы', docs: 20, updated: '18.01.2026', icon: 'Factory' },
  ];

  const employees = [
    { name: 'Иванов Петр', position: 'Электрик', progress: 100, status: 'completed', lastTest: '25.01.2026' },
    { name: 'Сидорова Анна', position: 'Стропальщик', progress: 75, status: 'in-progress', lastTest: '—' },
    { name: 'Петров Михаил', position: 'Офисный работник', progress: 100, status: 'completed', lastTest: '20.01.2026' },
    { name: 'Козлова Мария', position: 'Лаборант', progress: 45, status: 'in-progress', lastTest: '—' },
    { name: 'Смирнов Игорь', position: 'Сварщик', progress: 0, status: 'not-started', lastTest: '—' },
  ];

  const documents = [
    { type: 'Приказ', title: 'О назначении ответственных за охрану труда', date: '28.01.2026', status: 'draft' },
    { type: 'Акт Н-1', title: 'Несчастный случай - Иванов П.С.', date: '26.01.2026', status: 'completed' },
    { type: 'Направление', title: 'На медосмотр - список №3', date: '25.01.2026', status: 'sent' },
    { type: 'Протокол', title: 'Проверка знаний по электробезопасности', date: '22.01.2026', status: 'completed' },
  ];

  const notifications = [
    { text: 'Обновление ФЗ-426: новые требования к СОУТ', type: 'update', time: '2 часа назад' },
    { text: 'Срок обучения истекает для 5 сотрудников', type: 'warning', time: '5 часов назад' },
    { text: 'Новый приказ Минтруда №245 от 27.01.2026', type: 'new', time: 'Вчера' },
    { text: 'Медосмотр: 12 сотрудников прошли проверку', type: 'info', time: '2 дня назад' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Icon name="Shield" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold">ОТ-Эксперт</h1>
              <p className="text-xs text-muted-foreground">Портал специалиста по охране труда</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="Bell" size={20} />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                8
              </span>
            </Button>
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">ОТ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-auto lg:inline-flex">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden md:inline">Дашборд</span>
            </TabsTrigger>
            <TabsTrigger value="npa" className="gap-2">
              <Icon name="BookOpen" size={16} />
              <span className="hidden md:inline">НПА</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="gap-2">
              <Icon name="GraduationCap" size={16} />
              <span className="hidden md:inline">Обучение</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2">
              <Icon name="FileText" size={16} />
              <span className="hidden md:inline">Документы</span>
            </TabsTrigger>
            <TabsTrigger value="employees" className="gap-2">
              <Icon name="Users" size={16} />
              <span className="hidden md:inline">Сотрудники</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2">Обзор системы</h2>
              <p className="text-muted-foreground">Актуальная информация по всем направлениям охраны труда</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <div className={`rounded-full p-2 bg-muted ${stat.color}`}>
                      <Icon name={stat.icon as any} size={20} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Bell" size={20} />
                    Последние уведомления
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.map((notif, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <div
                        className={`mt-1 rounded-full p-1.5 ${
                          notif.type === 'update'
                            ? 'bg-primary/10 text-primary'
                            : notif.type === 'warning'
                            ? 'bg-destructive/10 text-destructive'
                            : notif.type === 'new'
                            ? 'bg-secondary/10 text-secondary'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon
                          name={
                            notif.type === 'update'
                              ? 'RefreshCw'
                              : notif.type === 'warning'
                              ? 'AlertCircle'
                              : notif.type === 'new'
                              ? 'Sparkles'
                              : 'Info'
                          }
                          size={14}
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm leading-tight">{notif.text}</p>
                        <p className="text-xs text-muted-foreground">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} />
                    Статистика обучения
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Общий прогресс</span>
                      <span className="font-semibold">89%</span>
                    </div>
                    <Progress value={89} className="h-3" />
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Завершили обучение</span>
                      <Badge className="bg-secondary">156 чел.</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">В процессе</span>
                      <Badge variant="outline">14 чел.</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Не начали</span>
                      <Badge variant="destructive">5 чел.</Badge>
                    </div>
                  </div>
                  <Separator />
                  <Button className="w-full" variant="outline">
                    Подробная статистика
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="npa" className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">База НПА</h2>
                <p className="text-muted-foreground">Актуальные нормативно-правовые акты по охране труда</p>
              </div>
              <Button className="gap-2">
                <Icon name="Plus" size={16} />
                Добавить документ
              </Button>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Icon name="Search" size={18} className="absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      placeholder="Поиск по номеру, названию, ключевым словам..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все категории</SelectItem>
                      <SelectItem value="tk">Трудовой кодекс</SelectItem>
                      <SelectItem value="fz">Федеральные законы</SelectItem>
                      <SelectItem value="orders">Приказы</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {npaCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-3 text-primary">
                        <Icon name={category.icon as any} size={24} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{category.name}</CardTitle>
                        <CardDescription>{category.docs} документов</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Обновлено:</span>
                      <Badge variant="outline">{category.updated}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Последние обновления</CardTitle>
                <CardDescription>Недавно добавленные и измененные документы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'Приказ Минтруда №245 от 27.01.2026', type: 'Новый', date: '27.01.2026' },
                    { title: 'ФЗ-426: изменения в требованиях к СОУТ', type: 'Изменен', date: '25.01.2026' },
                    { title: 'ГОСТ 12.0.004-2025 "Организация обучения"', type: 'Новый', date: '20.01.2026' },
                    { title: 'СанПиН 1.2.3685-21: корректировка норм', type: 'Изменен', date: '18.01.2026' },
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Icon name="FileText" size={20} className="text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{doc.date}</p>
                        </div>
                      </div>
                      <Badge variant={doc.type === 'Новый' ? 'default' : 'secondary'}>{doc.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">Обучение персонала</h2>
                <p className="text-muted-foreground">Управление программами обучения и проверка знаний</p>
              </div>
              <Button className="gap-2">
                <Icon name="Plus" size={16} />
                Создать курс
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Активные программы обучения</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: 'Общая охрана труда',
                      enrolled: 145,
                      completed: 132,
                      duration: '4 часа',
                      deadline: '15.02.2026',
                    },
                    {
                      title: 'Электробезопасность (III группа)',
                      enrolled: 23,
                      completed: 18,
                      duration: '8 часов',
                      deadline: '28.02.2026',
                    },
                    {
                      title: 'Работа на высоте',
                      enrolled: 34,
                      completed: 29,
                      duration: '6 часов',
                      deadline: '10.02.2026',
                    },
                  ].map((course, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold">{course.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {course.completed} из {course.enrolled} завершили • {course.duration}
                          </p>
                        </div>
                        <Badge>До {course.deadline}</Badge>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Прогресс</span>
                          <span className="font-medium">{Math.round((course.completed / course.enrolled) * 100)}%</span>
                        </div>
                        <Progress value={(course.completed / course.enrolled) * 100} className="h-2" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-2">
                          <Icon name="Users" size={14} />
                          Участники
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Icon name="BarChart" size={14} />
                          Результаты
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Банк тестов</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: 'Общие требования ОТ', questions: 45, category: 'Базовый' },
                    { title: 'Электробезопасность', questions: 68, category: 'Специальный' },
                    { title: 'Пожарная безопасность', questions: 52, category: 'Базовый' },
                    { title: 'Работа на высоте', questions: 38, category: 'Специальный' },
                  ].map((test, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-muted transition-colors cursor-pointer">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-medium text-sm">{test.title}</p>
                        <Badge variant="outline" className="text-xs">
                          {test.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{test.questions} вопросов</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2 gap-2">
                    <Icon name="Plus" size={14} />
                    Создать тест
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Недавние результаты тестирования</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Иванов Петр', test: 'Электробезопасность', score: 95, date: '25.01.2026', passed: true },
                    { name: 'Петров Михаил', test: 'Общая ОТ', score: 88, date: '24.01.2026', passed: true },
                    { name: 'Сидорова Анна', test: 'Работа на высоте', score: 92, date: '23.01.2026', passed: true },
                    { name: 'Козлова Мария', test: 'Пожарная безопасность', score: 68, date: '22.01.2026', passed: false },
                  ].map((result, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{result.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{result.name}</p>
                          <p className="text-sm text-muted-foreground">{result.test}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-semibold">{result.score} баллов</p>
                          <p className="text-xs text-muted-foreground">{result.date}</p>
                        </div>
                        <Badge variant={result.passed ? 'default' : 'destructive'}>
                          {result.passed ? 'Сдан' : 'Не сдан'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">Документы</h2>
                <p className="text-muted-foreground">Создание и управление документами по охране труда</p>
              </div>
              <Select defaultValue="new">
                <SelectTrigger className="w-full md:w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">
                    <div className="flex items-center gap-2">
                      <Icon name="Plus" size={14} />
                      Создать документ
                    </div>
                  </SelectItem>
                  <SelectItem value="order">Приказ</SelectItem>
                  <SelectItem value="act-h1">Акт Н-1</SelectItem>
                  <SelectItem value="medical">Направление на МО</SelectItem>
                  <SelectItem value="protocol">Протокол</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Приказы', count: 18, icon: 'FileText', color: 'text-primary' },
                { title: 'Акты Н-1', count: 3, icon: 'AlertTriangle', color: 'text-destructive' },
                { title: 'Направления', count: 12, icon: 'Send', color: 'text-secondary' },
                { title: 'Протоколы', count: 10, icon: 'FileCheck', color: 'text-accent' },
              ].map((category, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{category.title}</CardTitle>
                    <div className={`${category.color}`}>
                      <Icon name={category.icon as any} size={20} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{category.count}</div>
                    <p className="text-xs text-muted-foreground mt-1">Всего документов</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Последние документы</CardTitle>
                <CardDescription>Недавно созданные и обновленные документы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-lg border hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-muted p-2">
                          <Icon
                            name={
                              doc.type === 'Акт Н-1'
                                ? 'AlertTriangle'
                                : doc.type === 'Направление'
                                ? 'Send'
                                : 'FileText'
                            }
                            size={20}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{doc.title}</p>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>{doc.date}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          doc.status === 'completed' ? 'default' : doc.status === 'sent' ? 'secondary' : 'outline'
                        }
                      >
                        {doc.status === 'completed' ? 'Завершен' : doc.status === 'sent' ? 'Отправлен' : 'Черновик'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                      <Icon name="FileText" size={24} />
                    </div>
                    <CardTitle className="text-base">Шаблоны приказов</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">15 готовых шаблонов для различных ситуаций</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-secondary/10 p-3 text-secondary">
                      <Icon name="ClipboardList" size={24} />
                    </div>
                    <CardTitle className="text-base">Мастер заполнения</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Пошаговое создание акта Н-1 с подсказками</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-accent/10 p-3 text-accent">
                      <Icon name="Archive" size={24} />
                    </div>
                    <CardTitle className="text-base">Архив документов</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Облачное хранилище всех созданных документов</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employees" className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">Сотрудники</h2>
                <p className="text-muted-foreground">Управление персоналом и отслеживание обучения</p>
              </div>
              <Button className="gap-2">
                <Icon name="UserPlus" size={16} />
                Добавить сотрудника
              </Button>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Icon name="Search" size={18} className="absolute left-3 top-3 text-muted-foreground" />
                    <Input placeholder="Поиск по имени или должности..." className="pl-10" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="completed">Обучены</SelectItem>
                      <SelectItem value="in-progress">В процессе</SelectItem>
                      <SelectItem value="not-started">Не начато</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employees.map((employee, index) => (
                    <div
                      key={index}
                      className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {employee.name.split(' ').map((n) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 lg:gap-6">
                        <div className="w-full md:w-48">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Прогресс</span>
                            <span className="font-medium">{employee.progress}%</span>
                          </div>
                          <Progress value={employee.progress} className="h-2" />
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right min-w-24">
                            <p className="text-xs text-muted-foreground">Последний тест</p>
                            <p className="text-sm font-medium">{employee.lastTest}</p>
                          </div>
                          <Badge
                            variant={
                              employee.status === 'completed'
                                ? 'default'
                                : employee.status === 'in-progress'
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {employee.status === 'completed'
                              ? 'Обучен'
                              : employee.status === 'in-progress'
                              ? 'В процессе'
                              : 'Не начато'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Назначение курсов</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Назначайте программы обучения отдельным сотрудникам, группам или должностям
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Icon name="Users" size={14} />
                    Массовое назначение
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Контроль сроков</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Автоматические напоминания о приближении истечения сроков обучения
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Icon name="Calendar" size={14} />
                    Календарь обучения
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Отчетность</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Статистика и отчеты по подразделениям и должностям
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Icon name="BarChart" size={14} />
                    Сформировать отчет
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
