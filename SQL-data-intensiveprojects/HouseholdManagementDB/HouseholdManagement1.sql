-- Create the Household Management Database

--Step1: Main Database Structure

CREATE DATABASE HouseholdManagementDB;
GO

USE HouseholdManagementDB;
GO

-- Enable necessary features
SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

-- Create Schemas for better organization
CREATE SCHEMA Household;
GO
CREATE SCHEMA Finance;
GO
CREATE SCHEMA Inventory;
GO
CREATE SCHEMA Tasks;
GO