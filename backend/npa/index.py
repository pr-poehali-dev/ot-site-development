import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor


def handler(event: dict, context) -> dict:
    """API для работы с базой нормативно-правовых актов"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        dsn = os.environ['DATABASE_URL']
        conn = psycopg2.connect(dsn)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query_params = event.get('queryStringParameters') or {}
        action = query_params.get('action', 'categories')
        
        if action == 'categories':
            cursor.execute("""
                SELECT 
                    c.id,
                    c.name,
                    c.icon,
                    c.description,
                    COUNT(d.id) as docs_count,
                    MAX(d.updated_date) as last_updated
                FROM npa_categories c
                LEFT JOIN npa_documents d ON c.id = d.category_id
                GROUP BY c.id, c.name, c.icon, c.description
                ORDER BY c.id
            """)
            categories = cursor.fetchall()
            
            result = []
            for cat in categories:
                result.append({
                    'id': cat['id'],
                    'name': cat['name'],
                    'icon': cat['icon'],
                    'description': cat['description'],
                    'docs': cat['docs_count'],
                    'updated': str(cat['last_updated']) if cat['last_updated'] else None
                })
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        elif action == 'documents':
            category_id = query_params.get('category_id')
            search = query_params.get('search', '').strip()
            
            query = """
                SELECT 
                    d.id,
                    d.title,
                    d.document_number,
                    d.document_type,
                    d.status,
                    d.published_date,
                    d.updated_date,
                    c.name as category_name
                FROM npa_documents d
                LEFT JOIN npa_categories c ON d.category_id = c.id
                WHERE 1=1
            """
            params = []
            
            if category_id:
                query += " AND d.category_id = %s"
                params.append(int(category_id))
            
            if search:
                query += " AND (d.title ILIKE %s OR d.document_number ILIKE %s OR %s = ANY(d.keywords))"
                search_pattern = f'%{search}%'
                params.extend([search_pattern, search_pattern, search])
            
            query += " ORDER BY d.updated_date DESC LIMIT 50"
            
            cursor.execute(query, params)
            documents = cursor.fetchall()
            
            result = []
            for doc in documents:
                result.append({
                    'id': doc['id'],
                    'title': doc['title'],
                    'number': doc['document_number'],
                    'type': doc['document_type'],
                    'status': doc['status'],
                    'category': doc['category_name'],
                    'publishedDate': str(doc['published_date']) if doc['published_date'] else None,
                    'updatedDate': str(doc['updated_date']) if doc['updated_date'] else None
                })
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        elif action == 'recent':
            cursor.execute("""
                SELECT 
                    d.id,
                    d.title,
                    d.document_type,
                    d.updated_date,
                    c.name as category_name
                FROM npa_documents d
                LEFT JOIN npa_categories c ON d.category_id = c.id
                ORDER BY d.updated_date DESC
                LIMIT 10
            """)
            documents = cursor.fetchall()
            
            result = []
            for doc in documents:
                result.append({
                    'id': doc['id'],
                    'title': doc['title'],
                    'type': doc['document_type'],
                    'category': doc['category_name'],
                    'date': str(doc['updated_date']) if doc['updated_date'] else None
                })
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        else:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Unknown action'}, ensure_ascii=False),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}, ensure_ascii=False),
            'isBase64Encoded': False
        }
