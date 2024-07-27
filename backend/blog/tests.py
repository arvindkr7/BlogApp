from django.test import TestCase
from django.contrib.auth.models import User
from .models import Post, Comment
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse


class PostModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser',
                                             password='test@123')
        self.post = Post.objects.create(
            title='Test Post',
            content='This is a test post.',
            author=self.user
        )

    def test_post_creation(self):
        self.assertEqual(self.post.title, 'Test Post')
        self.assertEqual(self.post.content, 'This is a test post.')
        self.assertEqual(str(self.post), 'Test Post')
        self.assertEqual(self.post.author.username, 'testuser')

    def test_post_likes(self):
        self.post.likes.add(self.user)
        self.assertEqual(self.post.likes.count(), 1)
        self.assertIn(self.user, self.post.likes.all())


class CommentModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser',
                                             password='test@123')
        self.post = Post.objects.create(
            title='Test Post',
            content='This is a test post.',
            author=self.user
        )
        self.comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            text='This is a test comment.'
        )

    def test_comment_creation(self):
        self.assertEqual(self.comment.text, 'This is a test comment.')
        self.assertEqual(str(self.comment), 'Comment by testuser')
        self.assertEqual(self.comment.author.username, 'testuser')
        self.assertEqual(self.comment.post, self.post)


class PostAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='test@123')
        self.client.login(username='testuser', password='test@123')
        self.post = Post.objects.create(
            title='Test Post',
            content='This is a test post.',
            author=self.user
        )
        self.post_url = reverse('post-detail', kwargs={'pk': self.post.pk})

        # Obtain token and set credentials for all tests
        response = self.client.post(reverse('token_obtain_pair'), {'username': 'testuser', 'password': 'test@123'})
        self.assertEqual(response.status_code, 200)
        self.token = response.data['access_token']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_create_post(self):
        url = reverse('post-list')
        data = {
            'title': 'Test Post',
            'content': 'This is a test post.'
        }

        # Make the request to create the post
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_post(self):
        response = self.client.get(self.post_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_post(self):
        data = {'title': 'Updated Title', 'content': self.post.content}
        response = self.client.put(self.post_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Updated Title')

    def test_delete_post(self):
        response = self.client.delete(self.post_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class CommentAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser',
                                             password='test@123')
        self.client.login(username='testuser', password='test@123')
        self.post = Post.objects.create(
            title='Test Post',
            content='This is a test post.',
            author=self.user
        )
        self.comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            text='This is a test comment.'
        )
        self.comment_url = reverse('comment-detail',
                                   kwargs={'pk': self.comment.pk})
        
        # Obtain token and set credentials for all tests
        response = self.client.post(reverse('token_obtain_pair'), {'username': 'testuser', 'password': 'test@123'})
        self.assertEqual(response.status_code, 200)
        self.token = response.data['access_token']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_create_comment(self):
        url = reverse('comment-list')
        data = {
            'text': 'Another comment.',
            'post': self.post.pk
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_comment(self):
        response = self.client.get(self.comment_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_comment(self):
        data = {'text': 'Updated comment text.', 'post': self.post.pk}
        response = self.client.put(self.comment_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['text'], 'Updated comment text.')

    def test_delete_comment(self):
        response = self.client.delete(self.comment_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

