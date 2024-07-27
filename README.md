# Django Blog Application

## Project Setup

### Prerequisites
- Python 3.x
- Node.js and npm

### Backend Setup (Django)
1. Vavigate to the backend directory:
    ```sh
    cd backend
2. Create a virtual environment and activate it:
    ```sh
    python -m venv myenv
    # On Windows
    myenv\Scripts\activate
    # On macOS/Linux
    source myenv/bin/activate
    ```
3. Install required packages:
    ```sh
    pip install -r requirements.txt
    ```
4. Apply migrations:
    ```sh
    python manage.py makemigrations
    python manage.py migrate
    ```

### Frontend Setup (React)
1. Navigate to the frontend app:
    ```sh
    cd frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Set up proxy to backend in `package.json`:
    ```json
    {
      "proxy": "http://localhost:8000"
    }
    ```

### Running the Application
1. Run the Django server:
    ```sh
    python manage.py runserver
    ```
2. Run the React app:
    ```sh
    cd frontend
    npm start
    ```

3. Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### API Endpoints
- `/posts/` - List and create posts
- `/posts/<id>/` - Retrieve, update, delete a post
- `/comments/` - List and create comments
- `/comments/<id>` - Retrieve, update, delete a comment
- `/posts/<id>/like/` - To like/unlike a post
- `register/` - To sign up
- `login/` - Login with credentials to get jwt token,
- `token/refresh/` - To refresh an existing token,
- `logout/` - Log out the current user

### Authentication
- Implemented token-based authentication using `djangorestframework-simplejwt`.

### Additional Features
- Signup/Login
- Pagination for posts
- Post likes functionality
- Add/Edit/Delete a post
- Add/Edit/Delete a comment

### Testing
- Added Model/Views unit tests, you can run using below command
```sh
python manage.py test
```


<br/>
<hr>
<br/>


# Walk through

> Without Loging, any user can read the blogs, see comments and likes

- The likes are shown but user can't like/unlike them
- User can read comments, but they can't add a new comment or edit/delete a comment on a post by them
- User can read blogs, but they have not option to add a new blog unless logged in

### Home page
- Page 1
![Page 1](screenshots/image.png)
- Page 2
![Page 2](screenshots/image-1.png)

#### Let's expand all the Comments of Blog 1
![Expand and read comments](<screenshots/image -3.png>)

#### Blog Details page
![alt text](screenshots/read-a-post.png)



### Signup page
![Signup page](screenshots/image-signup.png)

- Upon successful signup, the user is redirected to the login page


### Login page
![alt text](screenshots/image-login.png)


> Once user is logged in, they can

- Add a new post
- Edit/delete their post
- Add a new comment on a post
- Edit/delete their comment

### Home page after login
![alt text](screenshots/image-loggedin-home.png)


#### Add a new post
![alt text](screenshots/add-post.png)

- Post added successfully
- NOTICE: A new post has been added at the top of older posts. The post is highlited with greeen-border that means, this post belongs to the logged in user. And furthermore, they have options to edit and delete the post.

![alt text](screenshots/post-added.png)


#### Update a post (Modal is opened)
![alt text](screenshots/update-post.png)
- Post updated (see the title changes)
![alt text](screenshots/post-updated.png)


#### Add a new comment
![alt text](screenshots/add-comment.png)
- comment added
![alt text](screenshots/comment-added.png)


#### Edit the comment (Modal is opened)
![alt text](screenshots/update-comment.png)

- Comment updated
![alt text](screenshots/comment-updated.png)


#### Read a specific post
![alt text](screenshots/read-a-post.png)


#### Delete a comment
![alt text](screenshots/delete-comment.png)
- comment deleted
![alt text](screenshots/comment-deleted.png)


#### Delete a post (user can delete their post only)
- NOTICE: Edit and delete options are available only to the user-specific posts
![alt text](screenshots/delete-post.png)

- post deleted
![alt text](screenshots/post-deleted.png)


### Like a post
- NOTICE: The like count has increased, color changed to green and filled
![alt text](screenshots/like-a-post.png)
