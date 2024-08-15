import React, { useState, useEffect } from 'react'
import { Box, Button, TextField, List, ListItem, ListItemText } from '@mui/material'
import { useParams } from 'react-router-dom'
import { createComment, getComments } from '../../../services/commentsService'
import styles from '../../../styles/Comments.module.scss'

const Comments: React.FC = () => {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    const fetchComments = async () => {
      if (projectId && taskId) {
        const commentsData = await getComments(projectId, taskId)
        setComments(commentsData)
      }
    }
    fetchComments()
  }, [projectId, taskId])

  const handleAddComment = async () => {
    if (projectId && taskId && newComment.trim()) {
      await createComment(projectId, taskId, newComment)
      setNewComment('')
      const updatedComments = await getComments(projectId, taskId)
      setComments(updatedComments)
    }
  }

  return (
    <Box>
      <List className={styles.commentsList}>
        {comments.map((comment: any, index: number) => (
          <ListItem key={index} className={styles.commentItem}>
            <ListItemText primary={comment.content} className={styles.commentText} />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleAddComment}>
        Add Comment
      </Button>
    </Box>
  )
}

export default Comments
