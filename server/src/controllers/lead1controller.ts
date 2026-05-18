import { Request, Response } from "express";
import Lead from "../models/Lead1";

/**
 * CREATE LEAD
 */
export const createLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * GET ALL LEADS (FILTER + SEARCH + SORT + PAGINATION)
 */
export const getLeads = async (req: Request, res: Response) => {
  try {
    const {
      status,
      source,
      search,
      sort = "latest",
      page = "1",
    } = req.query as {
      status?: string;
      source?: string;
      search?: string;
      sort?: "latest" | "oldest";
      page?: string;
    };

    const query: any = {};

    // FILTERS
    if (status) query.status = status;
    if (source) query.source = source;

    // SEARCH
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // PAGINATION
    const limit = 10;
    const currentPage = parseInt(page);
    const skip = (currentPage - 1) * limit;

    // SORT
    const sortOption: { createdAt: 1 | -1 } =
  sort === "oldest"
    ? { createdAt: 1 }
    : { createdAt: -1 };

    const leads = await Lead.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalLeads = await Lead.countDocuments(query);

    return res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      data: {
        leads,
        pagination: {
          totalLeads,
          currentPage,
          totalPages: Math.ceil(totalLeads / limit),
          limit,
        },
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * GET SINGLE LEAD
 */
export const getLeadById = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      lead,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * UPDATE LEAD
 */
export const updateLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/**
 * DELETE LEAD
 */
export const deleteLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};