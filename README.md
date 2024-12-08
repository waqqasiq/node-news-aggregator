
# News Aggregator Backend

This is the backend service for a news aggregator application. The backend is built with Node.js and Express.js, providing APIs for fetching and storing news articles and their associated topics. It includes functionalities for topic extraction, article storage, and scheduling updates from RSS feed channels.

---

## Features

1. **Fetch and Store Articles:**
   - Articles are fetched from multiple RSS feed channels and stored in a MySQL database.
   - Each article is associated with one or more topics extracted from its description.

2. **Topic Extraction:**
   - NLP-based topic extraction is implemented using the `compromise` package in Node.js.
   - Stop words are removed from the description before applying NLP for better accuracy.

3. **Pagination Support:**
   - APIs support paginated responses for efficient data consumption.

4. **Scheduler for Automatic Updates:**
   - A scheduler runs at the start of every hour (`0 * * * *`) to fetch and store the latest articles automatically, ensuring the database remains up-to-date.

5. **Swagger API Documentation:**
   - Swagger is set up to provide interactive API documentation for developers.

---

## Data Structures

### Database Schema

1. **Article Table:**
   - Stores information about each article, such as title, description, publication date, and associated feed channel.

   | Column          | Type         | Description                     |
   |-----------------|--------------|---------------------------------|
   | id              | Integer      | Primary key                    |
   | title           | String       | Title of the article           |
   | description     | String       | Description of the article     |
   | pub_date        | DateTime     | Publication date               |
   | link            | String       | Link to the article            |
   | thumbnail_url   | String       | Thumbnail URL                  |
   | feed_channel    | String       | Source feed channel            |
   | creator         | String       | Author or creator of the article |

2. **Topic Table:**
   - Stores distinct topics extracted from article descriptions.

   | Column  | Type    | Description          |
   |---------|---------|----------------------|
   | id      | Integer | Primary key          |
   | name    | String  | Name of the topic    |

3. **ArticleTopic Table:**
   - Acts as a join table to establish a many-to-many relationship between articles and topics.

   | Column      | Type    | Description                          |
   |-------------|---------|--------------------------------------|
   | id          | Integer | Primary key                         |
   | article_id  | Integer | Foreign key referencing `Article`   |
   | topic_id    | Integer | Foreign key referencing `Topic`     |

---

## Topic Extraction

The `compromise` NLP library is used for topic extraction. The process involves:
1. Removing stop words from the article description.
2. Applying NLP to extract key topics.
3. Storing these topics in the database and associating them with the corresponding article.

---

## API Documentation

Interactive API documentation is available through Swagger. Visit `/api-docs` after running the backend server to explore all available endpoints and their details.

---

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/waqqasiq/node-news-aggregator
   cd node-news-aggregator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Configure the following variables:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=mysql
     DB_NAME=news_aggregator
     ```

4. Run database migrations (if applicable):
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Start the server:
   ```bash
   npm run start:dev
   ```

6. Access Swagger API documentation:
   - Navigate to `http://localhost:3010/api-docs` in your browser.

---

## Scheduler Details

A scheduler is implemented to run at the start of every hour (`0 * * * *`). This scheduler automatically fetches and stores the latest articles from RSS feed channels, ensuring that the database stays updated with fresh content.

---

## Tech Stack

- **Backend Framework:** Node.js, Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **NLP Library:** Compromise
- **Documentation:** Swagger

---

## Contributing

Feel free to open issues or submit pull requests for improvements.

---

## License

This project is licensed under the MIT License.
