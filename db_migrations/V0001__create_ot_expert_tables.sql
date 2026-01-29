-- Создание таблиц для системы ОТ-Эксперт

-- Таблица категорий НПА
CREATE TABLE npa_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица документов НПА
CREATE TABLE npa_documents (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES npa_categories(id),
    title VARCHAR(500) NOT NULL,
    document_number VARCHAR(100),
    document_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    content TEXT,
    keywords TEXT[],
    published_date DATE,
    updated_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица сотрудников
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    hire_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица курсов обучения
CREATE TABLE training_courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_hours INTEGER,
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица назначений обучения
CREATE TABLE training_assignments (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    course_id INTEGER REFERENCES training_courses(id),
    assigned_date DATE DEFAULT CURRENT_DATE,
    deadline_date DATE,
    completion_date DATE,
    progress INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'not-started',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица тестов
CREATE TABLE tests (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES training_courses(id),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    total_questions INTEGER,
    passing_score INTEGER DEFAULT 70,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица результатов тестирования
CREATE TABLE test_results (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees(id),
    test_id INTEGER REFERENCES tests(id),
    score INTEGER NOT NULL,
    passed BOOLEAN NOT NULL,
    test_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица документов
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    document_type VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    content JSONB,
    status VARCHAR(50) DEFAULT 'draft',
    created_by VARCHAR(255),
    created_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица уведомлений
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    notification_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации поиска
CREATE INDEX idx_npa_documents_category ON npa_documents(category_id);
CREATE INDEX idx_npa_documents_keywords ON npa_documents USING GIN(keywords);
CREATE INDEX idx_npa_documents_title ON npa_documents USING GIN(to_tsvector('russian', title));
CREATE INDEX idx_employees_name ON employees(full_name);
CREATE INDEX idx_training_assignments_employee ON training_assignments(employee_id);
CREATE INDEX idx_training_assignments_status ON training_assignments(status);