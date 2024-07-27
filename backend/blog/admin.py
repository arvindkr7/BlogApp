from django.contrib import admin
from .models import Post, Comment


class CommentInline(admin.TabularInline):
    model = Comment
    # fields = ['author', 'text', 'post']
    readonly_fields = ['created_date']
    extra = 0  # Number of extra empty forms for new comments


class PostAdmin(admin.ModelAdmin):
    # list_display = ('title', 'author', 'published_date', 'num_likes')
    inlines = [CommentInline]

    def num_likes(self, obj):
        return obj.likes.count()
    num_likes.short_description = 'Number of Likes'


admin.site.register(Post, PostAdmin)
admin.site.register(Comment)

