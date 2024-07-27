from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination


class PostPagination(PageNumberPagination):
    page_size = 3


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = PostPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user') or\
            self.request.data.get('user')
        post_id = self.request.query_params.get('post') or\
            self.request.data.get('post')

        if user_id:
            queryset = queryset.filter(author__id=user_id)
        if post_id:
            queryset = queryset.filter(id=post_id)

        return queryset


@api_view(['POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def like_post(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.user in post.likes.all():
        post.likes.remove(request.user)
    else:
        post.likes.add(request.user)
    post.save()

    return Response(PostSerializer(post).data)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user') or\
            self.request.data.get('user')
        post_id = self.request.query_params.get('post') or\
            self.request.data.get('post')

        if user_id:
            queryset = queryset.filter(author__id=user_id)
        if post_id:
            queryset = queryset.filter(post__id=post_id)

        return queryset
