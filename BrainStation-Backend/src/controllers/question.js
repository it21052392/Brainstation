import {
  deleteQuestionService,
  flagQuestionService,
  getFlaggedQuestionsService,
  getOneQuestionService,
  getQuestionByIdService,
  insertBulkQuestionsService,
  insertQuestionService,
  updateQuestionService,
  viewQuestionsService
} from '@/services/question';
import { makeResponse } from '@/utils/response';

export const createQuestion = async (req, res) => {
  await insertQuestionService(req.body);
  return makeResponse({ res, status: 201, message: 'Question added successfully' });
};

export const bulkInsertQuestions = async (req, res) => {
  await insertBulkQuestionsService(req.body);
  return makeResponse({ res, status: 201, message: 'Questions added successfully' });
};

export const viewQuestions = async (req, res) => {
  const questions = await viewQuestionsService(req.query);
  return makeResponse({ res, data: questions, message: 'Questions retrieved successfully' });
};

export const getQuestionById = async (req, res) => {
  const question = await getQuestionByIdService(req.params.id);
  return makeResponse({ res, data: question, message: 'Question retrieved successfully' });
};

export const getOneQuestion = async (req, res) => {
  const question = await getOneQuestionService(req.query, req.body);
  return makeResponse({ res, data: question, message: 'Question retrieved successfully' });
};

export const updateQuestion = async (req, res) => {
  await updateQuestionService(req.params.id, req.body);
  return makeResponse({ res, message: 'Question updated successfully' });
};

export const deleteQuestion = async (req, res) => {
  await deleteQuestionService(req.params.id);
  return makeResponse({ res, message: 'Question deleted successfully' });
};

export const getFlaggedQuestions = async (req, res) => {
  const questions = await getFlaggedQuestionsService(req.query);
  return makeResponse({ res, data: questions, message: 'Flagged questions retrieved successfully' });
};

export const flagQuestion = async (req, res) => {
  await flagQuestionService(req.params.id);
  return makeResponse({ res, message: 'Question flagged successfully' });
};
